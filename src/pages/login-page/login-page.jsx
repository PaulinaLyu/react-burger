import {
  Button,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Loader } from "../../components/loader";
import { Link, useNavigate, Navigate } from "react-router";
import { RouterPaths } from "../../utils";
import { useAppDispatch, useForm, useAppSelector } from "../../hooks";
import { loginUserThunk } from "../../services/actions/auth-actions";

export const LoginPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isLoading, user } = useAppSelector((state) => state.auth);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { email: "", password: "" },
    onSubmit: async (data) => {
      try {
        await dispatch(loginUserThunk(data)).unwrap();
        navigate(RouterPaths.MAIN, { replace: true });
      } catch (err) {
        console.error("Ошибка входа", err);
      }
    },
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <form className="text-align-center" onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <EmailInput
        extraClass="mb-6"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        value={values.password}
        onChange={handleChange}
      />

      <Button
        type="primary"
        extraClass="mb-20"
        htmlType="submit"
        disabled={!values.email || !values.password}
      >
        {isLoading ? <Loader /> : "Войти"}
      </Button>

      <p className="text text_type_main-default text_color_inactive mb-4">
        Вы — новый пользователь?{" "}
        <Link to={RouterPaths.REGISTRATION}>Зарегистрироваться</Link>
      </p>
      <p className="text text_type_main-default text_color_inactive">
        Забыли пароль?{" "}
        <Link to={RouterPaths.FORGOT_PASSWORD}>Восстановить пароль</Link>
      </p>
    </form>
  );
};

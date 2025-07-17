import {
  Button,
  Input,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { RouterPaths } from "../../utils";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { useForm } from "../../hooks/useForm";
import { Link, Navigate, useNavigate, useLocation } from "react-router";

export const ResetPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAppSelector((state) => state.auth);
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { password: "", token: "" },
    onSubmit: async (data) => {
      // await dispatch(resetPasswordThunk(data));
      // navigate(RouterPaths.RESET_PASSWORD, { replace: true });
    },
  });

  if (!location.state?.isFromForgotPass) {
    return <Navigate to="/" replace />;
  }

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <form className="text-align-center" onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <PasswordInput
        placeholder="Введите новый пароль"
        name="password"
        value={values.password}
        onChange={handleChange}
        extraClass="mb-6"
      />
      <Input
        placeholder="Введите код из письма"
        name="token"
        value={values.token}
        onChange={handleChange}
        extraClass="mb-6"
      />
      <Button type="primary" extraClass="mb-20" htmlType="submit">
        Сохранить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to={RouterPaths.LOGIN}>Войти</Link>
      </p>
    </form>
  );
};

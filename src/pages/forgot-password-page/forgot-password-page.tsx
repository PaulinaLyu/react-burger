import { Link, useNavigate, Navigate } from "react-router";
import { RouterPaths } from "../../utils";
import {
  Button,
  EmailInput,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../hooks";
import { useForm } from "../../hooks/useForm";
import { resetPasswordThunk } from "../../services/actions/auth-actions";
import { userStorageService } from "../../services/userStorageService";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = userStorageService.getUser();

  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { email: "" },
    onSubmit: async (data) => {
      try {
        await dispatch(resetPasswordThunk(data)).unwrap();
        navigate(RouterPaths.RESET_PASSWORD, {
          state: {
            isFromForgotPass: true,
          },
          replace: true,
        });
      } catch {
        console.error("Ошибка восстановления пароля");
      }
    },
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  return (
    <form className="text-align-center" onSubmit={handleSubmit}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <EmailInput
        extraClass="mb-6"
        placeholder="Укажите e-mail"
        name="email"
        value={values.email}
        onChange={handleChange}
      />
      <Button
        disabled={!values.email}
        type="primary"
        extraClass="mb-20"
        htmlType="submit"
      >
        Восстановить
      </Button>
      <p className="text text_type_main-default text_color_inactive">
        Вспомнили пароль? <Link to={RouterPaths.LOGIN}>Войти</Link>
      </p>
    </form>
  );
};

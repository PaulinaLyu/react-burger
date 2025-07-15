import { Link, useNavigate } from "react-router"
import { RouterPaths } from "../../utils"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppDispatch } from "../../hooks";
import { useForm } from "../../hooks/useForm";
import { resetPasswordThunk } from "../../services/actions/auth-actions";

export const ForgotPasswordPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { email: '' },
    onSubmit: async(data) => {
      await dispatch(resetPasswordThunk(data));
      navigate(RouterPaths.RESET_PASSWORD, {replace: true})
    },
  });

  return <form className="text-align-center" onSubmit={handleSubmit}>
              <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
              <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' name="email" value={values.email} onChange={handleChange} />
              <Button type="primary" extraClass="mb-20" htmlType="submit">Восстановить</Button>
              <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={RouterPaths.LOGIN}>Войти</Link></p>
          </form>
};

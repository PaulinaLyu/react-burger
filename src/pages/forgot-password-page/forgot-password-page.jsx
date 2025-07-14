import { Link } from "react-router"
import { RouterPaths } from "../../utils"
import { Button, EmailInput } from "@ya.praktikum/react-developer-burger-ui-components";

export const ForgotPasswordPage = () => {
  const onSubmit = () => {}

  return <form className="text-align-center" onSubmit={onSubmit}>
              <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
              <EmailInput extraClass="mb-6" placeholder='Укажите e-mail' name="email" />
              <Button type="primary" extraClass="mb-20" htmlType="submit">Восстановить</Button>
              <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={RouterPaths.LOGIN}>Войти</Link></p>
          </form>
};

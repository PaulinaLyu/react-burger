import { Button, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouterPaths } from "../../utils";
import { Link } from "react-router";

export const ResetPasswordPage = () => {
  const onSubmit = () => {}

  return  <form className="text-align-center" onSubmit={onSubmit}>
            <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
            <PasswordInput placeholder='Введите новый пароль' name="password" extraClass="mb-6" />
            <Input placeholder='Введите код из письма' name="token" extraClass="mb-6" />
            <Button type="primary" extraClass="mb-20" htmlType="submit" >Сохранить</Button>
            <p className="text text_type_main-default text_color_inactive">Вспомнили пароль? <Link to={RouterPaths.LOGIN}>Войти</Link></p>
          </form>;
};

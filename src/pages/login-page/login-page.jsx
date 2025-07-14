import { Button, EmailInput, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { Link } from "react-router";
import {RouterPaths} from '../../utils'

export const LoginPage = () => {
  const onSubmit = () => {}

  return <form onSubmit={onSubmit}>
          <>
            <h1 className="text text_type_main-medium mb-6">Вход</h1>
            <EmailInput extraClass="mb-6" name="email" />
            <PasswordInput extraClass="mb-6" name="password" />
            <Button type="primary" extraClass="mb-20" htmlType="submit">Войти</Button>
            <p className="text text_type_main-default text_color_inactive mb-4">Вы — новый пользователь? <Link to={RouterPaths.REGISTRATION}>Зарегистрироваться</Link></p>
            <p className="text text_type_main-default text_color_inactive">Забыли пароль? <Link className="page-link" to={RouterPaths.FORGOT_PASSWORD}>Восстановить пароль</Link></p>
          </>
        </form>
};

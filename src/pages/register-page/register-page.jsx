import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouterPaths } from "../../utils";
import { Link } from "react-router";

export const RegisterPage = () => {
  const onSubmit = () => {}
  return  <form className="text-align-center" onSubmit={onSubmit}>
            <>
              <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
              <Input placeholder="Имя" extraClass="mb-6" name="name" />
              <EmailInput extraClass="mb-6" name="email" />
              <PasswordInput extraClass="mb-6" name="password" />
              <Button type="primary" extraClass="mb-20" htmlType="submit">Зарегистрироваться</Button>
              <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link to={RouterPaths.LOGIN}>Войти</Link></p>
            </>
          </form>
};

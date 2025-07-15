import { Button, EmailInput, Input, PasswordInput } from "@ya.praktikum/react-developer-burger-ui-components";
import { RouterPaths } from "../../utils";
import { useAppDispatch, useForm } from "../../hooks";
import { Link, useNavigate } from "react-router";
import { registerUserThunk } from "../../services/actions/auth-actions";

export const RegisterPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { values, handleChange, handleSubmit } = useForm({
    initialValues: { email: '', name: '', password: '' },
    onSubmit: async(data) => {
      debugger;
      await dispatch(registerUserThunk(data));
         debugger;
      navigate(RouterPaths.MAIN, {replace: true})
    },
  });

  return  <form className="text-align-center" onSubmit={handleSubmit}>
              <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
              <Input placeholder="Имя" extraClass="mb-6" name="name" value={values.name} onChange={handleChange} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined} />
              <EmailInput extraClass="mb-6" name="email" value={values.email} onChange={handleChange} />
              <PasswordInput extraClass="mb-6" name="password" value={values.password} onChange={handleChange} />
              <Button type="primary" extraClass="mb-20" htmlType="submit">Зарегистрироваться</Button>
              <p className="text text_type_main-default text_color_inactive mb-4">Уже зарегистрированы? <Link to={RouterPaths.LOGIN}>Войти</Link></p>
          </form>
};

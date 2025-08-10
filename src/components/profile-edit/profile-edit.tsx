import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Loader } from "../loader";
import { useAppDispatch, useAppSelector, useForm } from "../../hooks";
import { updateUserThunk } from "../../services/actions/auth-actions";
import { userStorageService } from "../../services/userStorageService";

export const ProfileEdit = () => {
  const dispatch = useAppDispatch();
  const user = userStorageService.getUser();
  const { isLoading } = useAppSelector((state) => state.auth);
  const { values, handleChange, handleSubmit, resetForm } = useForm({
    initialValues: { email: user?.email, password: "", name: user?.name },
    onSubmit: (data) => {
      dispatch(updateUserThunk(data));
    },
  });
  const isValueChanged =
    values?.name &&
    values?.email &&
    values?.password &&
    (user?.name !== values?.name || values?.email !== user?.email);

  return (
    <form
      className="text-align-center"
      onSubmit={handleSubmit}
      onReset={resetForm}
    >
      <Input
        extraClass="mb-6"
        name="name"
        placeholder="Имя"
        value={values.name}
        onChange={handleChange}
        icon="EditIcon"
      />
      <EmailInput
        extraClass="mb-6"
        name="email"
        isIcon
        value={values.email}
        onChange={handleChange}
      />
      <PasswordInput
        extraClass="mb-6"
        name="password"
        icon="EditIcon"
        value={values.password}
        onChange={handleChange}
      />

      {isValueChanged && (
        <div>
          <Button type="primary" htmlType="reset">
            Отмена
          </Button>
          <Button type="primary" extraClass="ml-5" htmlType="submit">
            {isLoading ? <Loader /> : "Сохранить"}
          </Button>
        </div>
      )}
    </form>
  );
};

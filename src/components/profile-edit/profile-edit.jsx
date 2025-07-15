import {
  Input,
  EmailInput,
  PasswordInput,
} from "@ya.praktikum/react-developer-burger-ui-components";

export const ProfileEdit = () => {
  return (
    <form className="text-align-center">
      <Input extraClass="mb-6" name="name" placeholder="Имя" icon="EditIcon" />
      <EmailInput extraClass="mb-6" name="email" icon="EditIcon" />
      <PasswordInput extraClass="mb-6" name="password" icon="EditIcon" />
    </form>
  );
};

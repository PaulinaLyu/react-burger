import { useState } from "react";

type SubmitFunction<T> = (values: T) => void;

interface UseFormProps<T> {
  initialValues: T;
  onSubmit: SubmitFunction<T>;
}

export function useForm<T extends Record<string, any>>({
  initialValues,
  onSubmit,
}: UseFormProps<T>) {
  const [values, setValues] = useState<T>(initialValues);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(values);
  };

  const resetForm = () => {
    setValues(initialValues);
  };

  return {
    values,
    handleChange,
    handleSubmit,
    resetForm,
  };
}

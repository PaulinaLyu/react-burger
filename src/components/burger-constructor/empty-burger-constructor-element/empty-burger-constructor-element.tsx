import styles from "./empty-burger-constructor-element.module.css";

interface IEmptyBurgerConstructorElementProps {
  position?: "top" | "bottom";
  text: string;
}

export const EmptyBurgerConstructorElement = ({
  position,
  text,
}: IEmptyBurgerConstructorElementProps) => {
  const posClass =
    position === "top"
      ? "constructor-element_pos_top"
      : position === "bottom"
      ? "constructor-element_pos_bottom"
      : "";

  return (
    <div className={`${styles.container} constructor-element ${posClass} ml-8`}>
      <div className="text text_type_main-default">{text}</div>
    </div>
  );
};

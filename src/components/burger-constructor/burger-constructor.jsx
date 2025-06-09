import { useMemo, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
  DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./burger-constructor.module.css";
import { dataTypes } from "../../data/data-types";
import { BUN } from "../../data/categories";
import { ORDER_NUMBER } from "../../contants";
import { OrderDetails } from "../order-details";

export const BurgerConstructor = ({ data }) => {
  const [isShowOrderModal, setIsShowOrderModal] = useState(false);

  const showOrderModal = () => setIsShowOrderModal(true);
  const hideOrderModal = () => setIsShowOrderModal(false);

  const ingredients = useMemo(
    () => data.filter((item) => item.type !== BUN),
    [data]
  );
  const bun = useMemo(() => data.find((item) => item.type === BUN), [data]);

  const totalPrice = useMemo(() => {
    if (!bun) return ingredients.reduce((sum, item) => sum + item.price, 0);
    return (
      bun.price * 2 + ingredients.reduce((sum, item) => sum + item.price, 0)
    );
  }, [ingredients, bun]);

  const renderBun = (type, label) => (
    <ConstructorElement
      type={type}
      isLocked={true}
      text={`${bun.name} (${label})`}
      price={bun.price}
      thumbnail={bun.image}
      extraClass={`${styles.bun} ml-8`}
    />
  );

  return (
    <section className={`${styles.section} pr-5`}>
      <div className={`${styles.editor} mt-25`}>
        {bun && renderBun("top", "верх")}

        <ul className={`${styles.list} mt-4 mb-4`}>
          {ingredients.map((item, index) => (
            <li className={`${styles.item} mt-4`} key={item._id || index}>
              <DragIcon type="primary" />
              <ConstructorElement
                text={item.name}
                price={item.price}
                thumbnail={item.image}
                extraClass={`${styles.ingredient} ml-2`}
              />
            </li>
          ))}
        </ul>

        {bun && renderBun("bottom", "низ")}
      </div>

      <div className={`${styles.total} mt-10 mb-10`}>
        <div className="text text_type_digits-medium mb-1">{totalPrice}</div>
        <div className={`${styles.icon} ml-5 mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        <Button htmlType="button" type="primary" onClick={showOrderModal}>
          Оформить заказ
        </Button>
        {isShowOrderModal && (
          <OrderDetails orderNumber={ORDER_NUMBER} onClose={hideOrderModal} />
        )}
      </div>
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(dataTypes.isRequired).isRequired,
};

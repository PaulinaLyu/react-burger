import { useEffect, useState, Fragment } from "react";
import {
  Button,
  ConstructorElement,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Loader } from "../../components";
import { useNavigate } from "react-router";
import styles from "./burger-constructor.module.css";
import { BUN, SAUCE, FILLING } from "../../data/categories";
import { OrderDetails } from "../order-details";
import { Modal } from "../modal";
import { BurgerConstructorIngredient } from "../burger-constructor-ingredient";
import { EmptyBurgerConstructorElement } from "./empty-burger-constructor-element";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { useDrop } from "react-dnd";
import {
  setBun,
  setTotalPrice,
  addIngredient,
  removeIngredient,
  resetConstructor,
} from "../../services/reducers/burger-constructor.reducer";
import { RouterPaths } from "../../utils";
import { resetOrder } from "../../services/reducers/order.reducer";
import { createBurgerOrder } from "../../services/actions";
import { userStorageService } from "../../services/userStorageService";

export const BurgerConstructor = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = userStorageService.getUser();
  const [isShowOrderModal, setIsShowOrderModal] = useState(false);

  const { orderNumber, isLoading } = useAppSelector((state) => state.order);
  const { bun, ingredients, totalPrice } = useAppSelector(
    (state) => state.burgerConstructor
  );
  const hideOrderModal = () => {
    setIsShowOrderModal(false);
    dispatch(resetConstructor());
    dispatch(resetOrder());
  };

  const createNewOrder = () => {
    if (!user) {
      navigate(RouterPaths.LOGIN);
    }
    const ingredientsIds = ingredients.map((ingred) => ingred._id);
    const prepareOrder = [bun._id, ...ingredientsIds];
    dispatch(createBurgerOrder(prepareOrder));
    setIsShowOrderModal(true);
  };

  const [, dropTargetBunTop] = useDrop({
    accept: BUN,
    drop(item) {
      dispatch(setBun(item));
    },
  });

  const [, dropTargetBunBottom] = useDrop({
    accept: BUN,
    drop(item) {
      dispatch(setBun(item));
    },
  });

  const [, dropTargetIngredient] = useDrop({
    accept: [SAUCE, FILLING],
    drop(item) {
      dispatch(addIngredient(item));
    },
  });

  const handleRemoveIngredient = (id) => {
    dispatch(removeIngredient(id));
  };

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

  useEffect(() => {
    let sum = 0;
    if (bun) {
      sum += bun.price * 2;
    }
    sum += ingredients.reduce((sum, item) => (sum += item.price), 0);
    dispatch(setTotalPrice(sum));
  }, [bun, ingredients, dispatch]);

  return (
    <section className={`${styles.section} pr-5`}>
      <div className={`${styles.editor} mt-25`}>
        <div ref={dropTargetBunTop}>
          {bun ? (
            renderBun("top", "верх")
          ) : (
            <EmptyBurgerConstructorElement
              position="top"
              text="Выберите булку"
            />
          )}
        </div>
        <ul className={`${styles.list} mt-4 mb-4`} ref={dropTargetIngredient}>
          {ingredients && ingredients.length > 0 ? (
            ingredients.map((item, index) => (
              <Fragment key={item.uniqueId}>
                <BurgerConstructorIngredient
                  item={item}
                  index={index}
                  onDelete={handleRemoveIngredient}
                />
              </Fragment>
            ))
          ) : (
            <EmptyBurgerConstructorElement text="Выберите соус или начинку" />
          )}
        </ul>
        <div ref={dropTargetBunBottom}>
          {bun ? (
            renderBun("bottom", "низ")
          ) : (
            <EmptyBurgerConstructorElement
              position="bottom"
              text="Выберите булку"
            />
          )}
        </div>
      </div>

      <div className={`${styles.total} mt-10 mb-10`}>
        <div className="text text_type_digits-medium mb-1">{totalPrice}</div>
        <div className={`${styles.icon} ml-5 mr-10`}>
          <CurrencyIcon type="primary" />
        </div>
        {bun && ingredients?.length > 0 && (
          <Button htmlType="button" type="primary" onClick={createNewOrder}>
            {isLoading ? <Loader /> : "Оформить заказ"}
          </Button>
        )}
        {isShowOrderModal && orderNumber && (
          <Modal onClose={hideOrderModal}>
            <OrderDetails orderNumber={orderNumber} />
          </Modal>
        )}
      </div>
    </section>
  );
};

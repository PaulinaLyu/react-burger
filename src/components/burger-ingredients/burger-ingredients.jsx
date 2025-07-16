import { useMemo, useRef, createRef, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router";
import { BurgerTabs } from "../burger-tabs";
import { BurgerIngredientCard } from "../burger-ingredient-card";
import { IngredientDetails } from "../ingredient-details";
import styles from "./burger-ingredients.module.css";
import { categories } from "../../data/categories";
import { Modal } from "../modal";
import { Loader } from "../loader";
import { NO_DATA } from "../../contants";
import { BUN } from "../../data/categories";
import { useAppSelector, useAppDispatch } from "../../hooks";
import { resetCurrentIngredient } from "../../services/reducers/ingredient-details.reducer";
import { RouterPaths } from "../../utils";
import { setCurrentIngredient } from "../../services/reducers/ingredient-details.reducer";

export const BurgerIngredients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState(BUN);
  const dispatch = useAppDispatch();
  const { data, isLoadingData } = useAppSelector(
    (state) => state.burgerIngredients
  );
  const { currentIngredient } = useAppSelector(
    (state) => state.ingredientDetails
  );
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const groups = useMemo(() => {
    return categories.reduce((acc, { key }) => {
      acc[key] = data.filter((item) => item.type === key);
      return acc;
    }, {});
  }, [data]);

  const countData = useMemo(() => {
    const result = {};
    if (bun) {
      result[bun._id] = 2;
    }
    for (let item of ingredients) {
      if (!(item._id in result)) {
        result[item._id] = 0;
      }
      result[item._id]++;
    }
    return result;
  }, [bun, ingredients]);

  const headersRef = useRef(
    categories.reduce((acc, { key }) => {
      acc[key] = createRef();
      return acc;
    }, {})
  );

  const changeTab = (type) => {
    headersRef.current[type]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const hideDetailsModal = () => dispatch(resetCurrentIngredient());

  const handleScroll = (e) => {
    const containerTop = e.currentTarget.getBoundingClientRect().top;
    const distance = [];

    for (let header of Object.values(headersRef.current)) {
      const rect = header.current.getBoundingClientRect();
      const distanceToTop = Math.abs(rect.top - containerTop);
      distance.push(distanceToTop);
    }

    const min = Math.min(...distance);
    const minIndex = distance.indexOf(min);
    const newTab = Object.keys(headersRef.current)[minIndex];

    if (currentTab !== newTab) {
      setCurrentTab(newTab);
    }
  };

  const handleClickCard = useCallback(
    (ingredient) => {
      navigate(`/${RouterPaths.INGREDIENTS}/${ingredient._id}`, {
        replace: true,
        state: {
          backgroundLocation: location,
          ingredient: ingredient,
        },
      });
      dispatch(setCurrentIngredient(ingredient));
    },
    [dispatch, navigate, location]
  );

  return (
    <section className={`${styles.section} pl-5`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      {isLoadingData ? (
        <Loader />
      ) : (
        <>
          {" "}
          <BurgerTabs activeTab={currentTab} changeTab={changeTab} />
          <div className={styles.list} onScroll={handleScroll}>
            {categories.map(({ key, label }, index) => (
              <div
                className={categories.length !== index + 1 ? "mb-10" : ""}
                key={key}
              >
                <h2
                  className="text text_type_main-medium mt-2"
                  ref={headersRef.current[key]}
                >
                  {label}
                </h2>
                <ul className={styles.content}>
                  {groups[key]?.length > 0
                    ? groups[key]?.map((item) => (
                        <BurgerIngredientCard
                          key={item._id}
                          item={item}
                          count={countData[item._id]}
                          onClick={() => handleClickCard(item)}
                        />
                      ))
                    : NO_DATA}
                </ul>
                {currentIngredient && (
                  <Modal title="Детали ингридиента" onClose={hideDetailsModal}>
                    <IngredientDetails item={currentIngredient} />
                  </Modal>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

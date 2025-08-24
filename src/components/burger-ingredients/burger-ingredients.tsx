import {
  useMemo,
  useRef,
  createRef,
  useState,
  useCallback,
  RefObject,
} from "react";
import { useLocation, useNavigate } from "react-router";
import { BurgerTabs } from "../burger-tabs";
import { BurgerIngredientCard } from "../burger-ingredient-card";
import styles from "./burger-ingredients.module.css";
import { categories } from "../../data/categories";
import { Loader } from "../loader";
import { NO_DATA } from "../../contants";
import { IngredientType } from "../../data/categories";
import { useAppSelector } from "../../hooks";
import { Ingredient } from "../../models";

type HeadersMap = Record<IngredientType, RefObject<HTMLHeadingElement | null>>;

export const BurgerIngredients = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [currentTab, setCurrentTab] = useState<IngredientType>(
    IngredientType.BUN
  );
  const { data, isLoading } = useAppSelector(
    (state) => state.burgerIngredients
  );
  const { bun, ingredients } = useAppSelector(
    (state) => state.burgerConstructor
  );

  const groups: Record<IngredientType, Ingredient[]> = useMemo(() => {
    return categories.reduce((acc, { key }) => {
      acc[key] = data.filter((item: Ingredient) => item.type === key);
      return acc;
    }, {} as Record<IngredientType, Ingredient[]>);
  }, [data]);

  const countData = useMemo(() => {
    const result: Record<string, number> = {};
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

  const headersRef = useRef<HeadersMap>(
    categories.reduce((acc, { key }) => {
      acc[key] = createRef<HTMLHeadingElement | null>();
      return acc;
    }, {} as HeadersMap)
  );

  const changeTab = (type: IngredientType) => {
    headersRef.current[type]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleScroll = (e: React.UIEvent<HTMLElement>) => {
    const containerTop = e.currentTarget.getBoundingClientRect().top;
    const distance = [];

    for (let header of Object.values(headersRef.current)) {
      if (header?.current) {
        const rect = header.current.getBoundingClientRect();
        const distanceToTop = Math.abs(rect.top - containerTop);
        distance.push(distanceToTop);
      }
    }

    const min = Math.min(...distance);
    const minIndex = distance.indexOf(min);
    const newTab = Object.keys(headersRef.current)[minIndex];

    if (currentTab !== newTab) {
      if (Object.values(IngredientType).includes(newTab as IngredientType)) {
        setCurrentTab(newTab as IngredientType);
      }
    }
  };

  const handleClickCard = useCallback(
    (ingredient: Ingredient) => {
      navigate(`/ingredients/${ingredient._id}`, {
        replace: true,
        state: {
          backgroundLocation: location,
          ingredient: ingredient,
        },
      });
    },
    [navigate, location]
  );

  return (
    <section className={`${styles.section} pl-5`}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      {isLoading ? (
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
              </div>
            ))}
          </div>
        </>
      )}
    </section>
  );
};

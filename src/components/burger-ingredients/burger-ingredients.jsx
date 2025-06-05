import React from "react";
import PropTypes from "prop-types";
import styles from "./burger-ingredients.module.css";
import { categories } from "../../data/categories";
import { dataTypes } from "../../data/data-types";
import { BurgerTabs } from "../burger-tabs";
import { BurgerIngredientCard } from "../burger-ingredient-card";

export const BurgerIngredients = ({ data }) => {
  const groups = React.useMemo(() => {
    return categories.reduce((acc, { key }) => {
      acc[key] = data.filter((item) => item.type === key);
      return acc;
    }, {});
  }, [data]);

  const headersRef = React.useRef(
    categories.reduce((acc, { key }) => {
      acc[key] = React.createRef();
      return acc;
    }, {})
  );

  const changeTab = (type) => {
    headersRef.current[type]?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large mt-10 mb-5">Соберите бургер</h1>

      <BurgerTabs changeTab={changeTab} />

      <div className={styles.list}>
        {categories.map(({ key, label }, index) => (
          <div className={categories.length !== index + 1 && "mb-10"} key={key}>
            <h2
              className="text text_type_main-medium mt-2"
              ref={headersRef.current[key]}
            >
              {label}
            </h2>
            <ul className={styles.content}>
              {groups[key]?.map((item) => (
                <BurgerIngredientCard
                  key={item._id}
                  title={item.name}
                  price={item.price}
                  img={item.image}
                />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(dataTypes.isRequired).isRequired,
};

import { useEffect, useState } from "react";
import { fetchIngredients } from "../api/ingredients";

export const useIngredients = () => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [isError, setError] = useState(false);

  useEffect(() => {
    fetchIngredients()
      .then((ingredients) => {
        setData(ingredients);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Ошибка при загрузке ингредиентов:", error);
        setError(true);
        setLoading(false);
      });
  }, []);

  return { data, isLoading, isError };
};

export enum IngredientType {
  BUN = "bun",
  SAUCE = "sauce",
  FILLING = "main",
}

export const categories = [
  { key: IngredientType.BUN, label: "Булки" },
  { key: IngredientType.SAUCE, label: "Соусы" },
  { key: IngredientType.FILLING, label: "Начинки" },
];

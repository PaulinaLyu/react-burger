import { IngredientType } from "../../src/data/categories";

const SELECTORS = {
  INGREDIENT_CARD: '[data-testid="ingredient-card"]',
  CARD_INGREDIENT_NAME: '[data-testid="card-ingredient-name"]',
  EMPTY_CONSTRUCTOR_BUN_TOP: '[data-testid="empty-constructor-bun-top"]',
  EMPTY_CONSTRUCTOR_INGREDIENT: '[data-testid="empty-constructor-ingredient"]',
  CONSTRUCTOR_INGREDIENT: '[data-testid="constructor-ingredient"]',
  TOTAL_PRICE: '[data-testid="total-price"]',
  PLACE_ORDER_BTN: '[data-testid="place-order-btn"]',
  CONSTRUCTOR_ELEMENT_TOP: ".constructor-element_pos_top",
  CONSTRUCTOR_ELEMENT_TEXT: ".constructor-element__text",
  CONSTRUCTOR_ELEMENT_ACTION: ".constructor-element__action",
};

describe("Конструктор бургера", () => {
  const dragIngredientToConstructor = (
    ingredientType: IngredientType,
    targetType: any
  ) => {
    const ingredientSelector =
      ingredientType === IngredientType.BUN
        ? `${SELECTORS.INGREDIENT_CARD}[data-ingredient-type="bun"]:first-child`
        : `${SELECTORS.INGREDIENT_CARD}:not([data-ingredient-type*="bun"]):first-child`;

    const targetSelector =
      targetType === IngredientType.BUN
        ? SELECTORS.EMPTY_CONSTRUCTOR_BUN_TOP
        : SELECTORS.EMPTY_CONSTRUCTOR_INGREDIENT;

    cy.get(ingredientSelector).first().trigger("dragstart");
    cy.get(targetSelector).trigger("drop");
  };

  const expectIngredientInConstructor = (expectedCount = 1) => {
    cy.get(SELECTORS.CONSTRUCTOR_INGREDIENT).should(
      "have.length",
      expectedCount
    );
  };

  const expectTotalPrice = (expectedPrice: string) => {
    cy.get(SELECTORS.TOTAL_PRICE).should("contain", expectedPrice);
  };

  beforeEach(() => {
    cy.visit("/");
  });

  it("должен перетащить булочку в конструктор", () => {
    cy.get(SELECTORS.INGREDIENT_CARD)
      .first()
      .find(SELECTORS.CARD_INGREDIENT_NAME)
      .invoke("text")
      .then((ingredientName) => {
        cy.log("Название перетаскиваемого ингредиента:", ingredientName);

        dragIngredientToConstructor(IngredientType.BUN, IngredientType.BUN);

        cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_TOP).should("exist");

        cy.get(SELECTORS.CONSTRUCTOR_ELEMENT_TEXT)
          .filter(`:contains(${ingredientName})`)
          .should("have.length", 2);
      });
  });

  it("должен перетащить ингредиент в конструктор", () => {
    dragIngredientToConstructor(IngredientType.FILLING, "ingredient");

    expectIngredientInConstructor(1);
  });

  it("должен обновить цену после добавления ингредиента и булочек", () => {
    dragIngredientToConstructor(IngredientType.BUN, IngredientType.BUN);
    dragIngredientToConstructor(IngredientType.FILLING, "ingredient");

    expectIngredientInConstructor(1);
    expectTotalPrice("2600");
  });

  it("должен рендерить кнопку оформить заказ только после добавления булочек и ингредиента", () => {
    cy.get(SELECTORS.PLACE_ORDER_BTN).should("not.exist");

    dragIngredientToConstructor(IngredientType.BUN, IngredientType.BUN);

    cy.get(SELECTORS.PLACE_ORDER_BTN).should("not.exist");

    dragIngredientToConstructor(IngredientType.FILLING, "ingredient");

    cy.get(SELECTORS.PLACE_ORDER_BTN).should("exist");
  });

  it("должен удалять ингредиент из конструктора при нажатии на кнопку", () => {
    dragIngredientToConstructor(IngredientType.FILLING, "ingredient");

    expectIngredientInConstructor(1);
    expectTotalPrice("90");

    cy.get(`${SELECTORS.CONSTRUCTOR_ELEMENT_ACTION} > svg > path`).click();

    expectIngredientInConstructor(0);
    expectTotalPrice("0");
  });
});

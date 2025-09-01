export const DOMAIN = "https://norma.nomoreparties.space";
export const ORDER_API = "/api/orders";
export const INGREDIENTS_API = "/api/ingredients";

describe("constuctor-page", () => {
  beforeEach(() => {
    // cy.intercept("GET", `${DOMAIN}${INGREDIENTS_API}`, {
    //   fixture: "ingredients.json",
    // }).as("getIngredients");

    cy.visit("http://localhost:3000");
    // cy.wait("@getIngredients");
  });

  it("должно открываться модальное окно при нажатии на карточку ингредиента", () => {
    // Ждем загрузки ингредиентов
    cy.get('[data-testid="ingredient-card"]').should("exist");

    // Кликаем на первый ингредиент
    cy.get('[data-testid="ingredient-card"]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-testid="modal"]').should("exist");
    // cy.get('[data-testid="modal"]').contains("Детали ингредиента");
  });
});

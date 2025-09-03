import { DOMAIN, INGREDIENTS_API } from "./../../src/api/constants";

const SELECTORS = {
  INGREDIENT_CARD: '[data-testid="ingredient-card"]',
  MODAL: '[data-testid="modal"]',
  MODAL_TITLE: '[data-testid="modal-title"]',
  MODAL_CLOSE: '[data-testid="modal-close-button"]',
  CARD_NAME: '[data-testid="card-ingredient-name"]',
  MODAL_NAME: '[data-testid="figcaption-ingredient-name"]',
};

describe("Модальное окно ингредиента", () => {
  beforeEach(() => {
    cy.intercept("GET", `${DOMAIN}${INGREDIENTS_API}`, {
      fixture: "ingredients.json",
    }).as("getIngredients");
    cy.visit("/");
    cy.wait("@getIngredients");
    cy.get(SELECTORS.INGREDIENT_CARD).first().as("firstIngredient");
  });

  const opneModal = () => {
    cy.get("@firstIngredient").click();
    cy.get(SELECTORS.MODAL).should("be.visible");
  };

  const closeModal = () => {
    cy.get(SELECTORS.MODAL_CLOSE).click();
    cy.get(SELECTORS.MODAL).should("not.exist");
  };

  describe("Взаимодействие с модальным окном", () => {
    it("должно открывать модальное окно при клике на карточку ингредиента", () => {
      opneModal();
      cy.get(SELECTORS.MODAL_TITLE).should("contain", "Детали ингредиента");
    });

    it("должно закрывать модальное окно при клике на кнопку закрытия", () => {
      opneModal();
      closeModal();
    });

    it("должно закрывать модальное окно при клике на overlay", () => {
      opneModal();
      cy.get(SELECTORS.MODAL).click("topLeft");
      cy.get(SELECTORS.MODAL).should("not.exist");
    });
  });

  describe("Содержимое модального окна", () => {
    it("должно отображать правильное название ингредиента", () => {
      cy.get("@firstIngredient")
        .find(SELECTORS.CARD_NAME)
        .invoke("text")
        .then((ожидаемоеНазвание) => {
          opneModal();
          cy.get(SELECTORS.MODAL_NAME).should("have.text", ожидаемоеНазвание);
        });
    });

    it("должно отображать изображение ингредиента", () => {
      opneModal();
      cy.get(`${SELECTORS.MODAL} img`).should("be.visible");
    });

    it("должно отображать пищевую ценность ингредиента", () => {
      opneModal();
      cy.get('[data-testid="nutrition"]').should("exist");
    });
  });
});

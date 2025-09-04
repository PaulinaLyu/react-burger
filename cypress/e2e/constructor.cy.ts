/// <reference types="cypress" />
export type {} from "../support/commands";
import { DOMAIN, LOGIN_API, ORDER_API } from "./../../src/api/constants";
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

  LOGIN_EMAIL_INPUT: '[data-testid="email-input"]',
  LOGIN_PASSWORD_INPUT: '[data-testid="password-input"]',
  LOGIN_SUBMIT_BTN: '[data-testid="login-btn"]',

  ORDER_MODAL: '[data-testid="order-modal"]',
  ORDER_MODAL_NUMBER: '[data-testid="order-number"]',
  MODAL_CLOSE_BTN: '[data-testid="modal-close-button"]',
};

describe("Создание заказа", () => {
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
    cy.interceptIngredients();

    cy.visit("/");

    cy.wait("@getIngredients");
  });

  describe("Взаимодействие с конструктор бургера", () => {
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

  describe("Оформление заказа", () => {
    const user = {
      email: "test@example.com",
      password: "password",
    };

    beforeEach(() => {
      cy.intercept("POST", `${DOMAIN}${LOGIN_API}`, {
        fixture: "login-success.json",
      }).as("login");

      cy.intercept("POST", `${DOMAIN}${ORDER_API}`, {
        fixture: "order-success.json",
      }).as("createOrder");
    });

    it("следует перенаправлять на страницу входа в систему, если пользователь не аутентифицирован", () => {
      dragIngredientToConstructor(IngredientType.BUN, IngredientType.BUN);
      dragIngredientToConstructor(IngredientType.FILLING, "ingredient");

      cy.get(SELECTORS.PLACE_ORDER_BTN).click();

      cy.url().should("include", "/login");
    });

    it("заказ должен быть успешно создан, когда пользователь аутентифицирован", () => {
      cy.visit("/login");
      cy.get(SELECTORS.LOGIN_EMAIL_INPUT).type(user.email);
      cy.get(SELECTORS.LOGIN_PASSWORD_INPUT).type(user.password);
      cy.get(SELECTORS.LOGIN_SUBMIT_BTN).click();
      cy.wait("@login");
      dragIngredientToConstructor(IngredientType.BUN, IngredientType.BUN);
      dragIngredientToConstructor(IngredientType.FILLING, "ingredient");

      expectTotalPrice("2600");

      cy.get(SELECTORS.PLACE_ORDER_BTN).click();

      cy.wait("@createOrder");

      cy.get(SELECTORS.ORDER_MODAL).should("be.visible");
      cy.get(SELECTORS.ORDER_MODAL_NUMBER).should("exist");
      cy.get(SELECTORS.ORDER_MODAL_NUMBER).contains("12345");

      cy.get(SELECTORS.MODAL_CLOSE_BTN).click();
      cy.get(SELECTORS.ORDER_MODAL).should("not.exist");

      cy.get(SELECTORS.EMPTY_CONSTRUCTOR_BUN_TOP).should("exist");
      cy.get(SELECTORS.EMPTY_CONSTRUCTOR_INGREDIENT).should("exist");
    });
  });
});

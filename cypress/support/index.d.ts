/// <reference types="cypress" />

declare global {
  namespace Cypress {
    interface Chainable {
      interceptIngredients(): void;
    }
  }
}

export {};

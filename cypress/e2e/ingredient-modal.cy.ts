describe("ingredient-modal", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("должно открываться модальное окно при нажатии на карточку ингредиента", () => {
    // Ждем загрузки ингредиентов
    cy.get('[data-testid="ingredient-card"]').should("exist");

    // Кликаем на первый ингредиент
    cy.get('[data-testid="ingredient-card"]').first().click();

    // Проверяем, что модальное окно открылось
    cy.get('[data-testid="modal"]').should("exist");

    // Проверяем, что модальное окно открылось с правильнм заголовком
    cy.get('[data-testid="modal-title"]')
      .should("exist")
      .contains("Детали ингредиента");
  });

  it("должно закрываться модальное окно при нажатии кнопки закрытия", () => {
    // Открываем модальное окно
    cy.get('[data-testid="ingredient-card"]').first().click();
    cy.get('[data-testid="modal"]').should("exist");

    // Закрываем модальное окно
    cy.get('[data-testid="modal-close-button"]').click();

    // Проверяем, что модальное окно закрылось
    cy.get('[data-testid="modal"]').should("not.exist");
  });

  it("должны отображаться правильные данные об ингредиентах в модальном окне", () => {
    // Получаем данные первого ингредиента
    cy.get('[data-testid="ingredient-card"]')
      .first()
      .find('[data-testid="card-ingredient-name"]')
      .invoke("text")
      .then((ingredientName) => {
        // Кликаем на ингредиент
        cy.get('[data-testid="ingredient-card"]').first().click();

        // Проверяем модальное окно
        cy.get('[data-testid="modal"]').should("exist");
        cy.get('[data-testid="figcaption-ingredient-name"]')
          .should("exist")
          .should("contain", ingredientName);
      });
  });
});

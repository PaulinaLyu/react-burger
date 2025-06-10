# React Burger Constructor

Проект выполнен в рамках обучения на платформе [Яндекс.Практикум](https://praktikum.yandex.ru/). Это одностраничное приложение для сбора бургера из ингредиентов с возможностью оформления заказа. Приложение написано с использованием React, TypeScript и библиотеки компонентов `@ya.praktikum/react-developer-burger-ui-components`.

## Запуск проекта

```bash
npm install
npm start
```

## Темплейт проекта

Проект создан с использованием Create React App с шаблоном TypeScript

```bash
npx create-react-app my-app --template typescript
```

## Структура проекта

components/ — все UI-компоненты и их стили:
-App

-AppHeader

-BurgerIngredients

-BurgerConstructor

-Modal

-ModalOverlay

-OrderDetails

-IngredientDetails

fonts/ — сторонние шрифты

data/ — моковые данные

hooks/ — кастомные хуки

images/ — изображения

pages/ — страницы

README.md

.gitignore

## Основной функционал

- Компонент <pre> `AppHeader` </pre> — навигация с иконками и логотипом

- Компонент <pre> `BurgerIngredients` </pre> — отображает список ингредиентов с категориями и счётчиками

- Компонент <pre> `BurgerConstructor` </pre> — сборка бургера, отображение стоимости и оформление заказа

- Компоненты <pre> `IngredientDetails` </pre> и <pre> `OrderDetails` </pre> — отображаются в модальных окнах

- Компонент <pre> `Modal` </pre> — универсальное модальное окно с возможностью закрытия по "Esc", оверлею или кнопке

- Используется <pre> `ModalOverlay` </pre> и портал для рендеринга модального окна

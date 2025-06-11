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

<b> `components/` </b> — все UI-компоненты и их стили:
 - <i> `App` </i>

 - <i> `AppHeader` </i>

 - <i> `BurgerIngredients` </i>

 - <i> `BurgerConstructor` </i>

 - <i> `Modal` </i>

 - <i> `ModalOverlay` </i>

 - <i> `OrderDetails` </i>

 - <i> `IngredientDetails` </i>

<b> `fonts/` </b> — сторонние шрифты

<b> `data/` </b> — моковые данные

<b> `hooks/` </b> — кастомные хуки

<b> `images/` </b> — изображения

<b> `pages/` </b> — страницы

<b> `README.md` </b>

<b> `.gitignore` </b>


## Основной функционал

- Компонент <b> `AppHeader` </b> — навигация с иконками и логотипом

- Компонент <b> `BurgerIngredients` </b> — отображает список ингредиентов с категориями и счётчиками

- Компонент <b> `BurgerConstructor` </b> — сборка бургера, отображение стоимости и оформление заказа

- Компоненты <b> `IngredientDetails` </b> и <b> `OrderDetails` </b> — отображаются в модальных окнах

- Компонент <b> `Modal` </b> — универсальное модальное окно с возможностью закрытия по "Esc", оверлею или кнопке

- Используется <b> `ModalOverlay` </b> и портал для рендеринга модального окна

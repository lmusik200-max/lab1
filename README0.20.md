# Лабораторна робота №2: Бекенд без БД (Варіант 10)

REST API сервер, побудований на Node.js, Express та TypeScript з використанням тришарової архітектури (Controller-Service-Repository). Дані зберігаються в оперативній пам'яті.

## 3.1. Як запустити проект

Для запуску проекту на вашому локальному комп'ютері виконайте наступні кроки:

1. Переконайтеся, що у вас встановлено Node.js.
2. Відкрийте термінал у папці проекту (`lr2-api-ts`).
3. Встановіть усі необхідні залежності:
   ```bash
   npm install
Запустіть сервер у режимі розробника:

Bash
npm run dev
Сервер буде доступний за адресою: http://localhost:3000

3.2. Список реалізованих сутностей
У проекті реалізовано дві основні сутності:

Courses (Курси) — основна доменна сутність варіанта.

Поля: id (uuid), title (назва), description (опис), durationHours (тривалість), level (рівень: Beginner/Intermediate/Advanced), createdAt (дата створення).

Додаткові можливості REST: Реалізовано фільтрацію за полем level та пагінацію (page, pageSize).

Users (Користувачі) — обов'язкова базова сутність.

Поля: id (uuid), name (ім'я), email (електронна пошта), createdAt (дата створення).

3.3. Приклади запитів (curl)
Нижче наведено приклади команд для тестування API через утиліту curl.

Сутність: Courses (Курси)
1. Створити новий курс (POST):

Bash
curl -i -X POST http://localhost:3000/api/courses \
-H "Content-Type: application/json" \
-d "{\"title\":\"Node.js Backend\",\"durationHours\":40,\"level\":\"Intermediate\"}"
2. Перевірка валідації — Помилка 400 (назва занадто коротка, невірний рівень):

Bash
curl -i -X POST http://localhost:3000/api/courses \
-H "Content-Type: application/json" \
-d "{\"title\":\"No\",\"durationHours\":0,\"level\":\"Expert\"}"
3. Отримати список курсів з фільтрацією та пагінацією (GET):

Bash
curl -i "http://localhost:3000/api/courses?level=Intermediate&page=1&pageSize=5"
4. Отримати курс за ID (GET):
(Замініть YOUR_ID на реальний ID, отриманий при створенні)

Bash
curl -i http://localhost:3000/api/courses/YOUR_ID
5. Оновити курс (PUT):

Bash
curl -i -X PUT http://localhost:3000/api/courses/YOUR_ID \
-H "Content-Type: application/json" \
-d "{\"title\":\"Advanced Node.js\",\"level\":\"Advanced\"}"
6. Видалити курс (DELETE):

Bash
curl -i -X DELETE http://localhost:3000/api/courses/YOUR_ID
Сутність: Users (Користувачі)
1. Створити користувача (POST):

Bash
curl -i -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d "{\"name\":\"Ivan Franko\",\"email\":\"ivan@example.com\"}"
2. Перевірка валідації користувача — Помилка 400 (невірний email):

Bash
curl -i -X POST http://localhost:3000/api/users \
-H "Content-Type: application/json" \
-d "{\"name\":\"Ivan\",\"email\":\"not-an-email\"}"
3. Отримати всіх користувачів (GET):

Bash
curl -i http://localhost:3000/api/users

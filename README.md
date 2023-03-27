# Сервис аналог Avito

Автор frontend-части – Алексей Зотин.

## Структура проекта

Папка back-skyVito – backend для проекта. Инструкция по его запуску ниже.

Папка src – основные материалы проекта:\
• Папка assets — шрифты и изображения\
• Папка components - компоненты React, используемые в проекте\
• Папка pages - страницы, для которых прописаны роуты\
• Папка router - содержит два файла: router.jsx, где описаны сами роуты, и loader.functions.js, где описаны сетевые запросы с помощью React Router\
• Папка services - axios-запросы\
• Папка store - компоненты Redux\
• Папка utils - вспомогательные компоненты: axios instance, константы, декораторы\

## Использованные технологии

Javascript, React.js, Redux, React Router, Styled Components, Axios

## Инструкция по запуску

Для начала работы склонируйте проект из репозитория себе на компьютер

### Инструкция по запуску backend

1. Для запуска бэкенда вам потребуется установить Docker.
2. Скачайте версию для своей операционной системы и запустите.
3. Далее следуйте инструкциям установщика.
4. После установки перезагрузите компьютер.
5. Запустите Docker с помощью ярлыка.
6. Через терминал перейдите в папку back-skyVito.
7. Запустите в терминале команду: docker-compose -f docker-compose-backend.yaml up -d
8. После первого выполнения команды все образы подтянуться, но могут не запуститься, в этом случае повторно выполните команду: docker-compose -f docker-compose-backend.yaml up -d
9. После этого бэкенд и Swagger будут доступны по адресу http://localhost:8090/
10. Чтобы остановить работу бэкенда выполните:docker-compose down

### Инструкция по запуску клиента

1. Перейдите в папку с проектом.
2. Установите все зависимости командой npm i.
3. Запустите проект командой npm start.

### Реализованный функционал

Регистрация и авторизация пользователей\
Вход/выход\
Получение и обновление профиля\
Смена пароля\
Просмотр объявлений без авторизации\
Просмотр объявлений, редактирование, удаление с авторизацией\
Просмотр комментариев без авторизации

Получение списка объявлений\
Получение одного объявления\
Создание объявления\
Редактирование и удаление своего объявления

Получение списка комментариев\
Создание комментариев

Сохранение и получение изображений

Реализована система доступов (анонимный пользователь, авторизованный пользователь)\
Пользователю не выводится чужая информация

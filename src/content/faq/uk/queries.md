---
question: Які типи DNS-запитів генерує Zonemaster?
category: Загальна інформація
---

Zonemaster надсилає численні DNS-запити до серверів імен, що обслуговують тестоване доменне ім'я, а також до серверів імен, що обслуговують батьківську зону цього доменного імені.

Вебінтерфейс Zonemaster не показує надіслані запити, це може робити лише інтерфейс командного рядка (CLI). Якщо ви хочете побачити такі запити, вам доведеться локально встановити мінімально робочий екземпляр Zonemaster з компонентами Engine та CLI. Для отримання додаткової інформації див. [документацію зі встановлення CLI](https://github.com/zonemaster/zonemaster/blob/master/docs/public/installation/zonemaster-cli.md) або, якщо вам зручніше, також доступний [образ Docker](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md#Invoking-the-command-line-tool-using-Docker).

Надіслані запити можна переглянути, використовуючи опцію рівня «DEBUG». Попереджаємо, що вивід CLI може бути досить об'ємним. Для отримання додаткової інформації див. [документацію з використання CLI](https://github.com/zonemaster/zonemaster/blob/master/docs/public/using/cli.md).
# Курсовая по Программированию (доп. главы)

## Идея проекта: фуллстек приложение - **_ClickZone_**

### **_Общая идея (коротко):_**

Изначально игроку доступен 1 режим: фигурка, на которую нужно кликать, чтобы улучшать её. Для ускорения развития будет возможность купить улучшения (как разовые, так и постоянные)

У пользователя есть возможность зарегистрироваться. Это даёт некоторое ускорение к его развитию относительно не авторизированных игроков. Авторизированный пользователь может зайти в свой личный кабинет, где будут отображаться его основные данные: никнейм, описание, награды, дата регистрации. Пользователь может сменить никнейм, добавить описание о себе.

На определённом уровне развития игроку открывается сервис "Рандомайзер" и "Рынок". В первом он может покупать контейнеры, ключи к ним (увеличивают шанс выпадания редких предметов. Но при этом каждый контейнер можно открыть без ключа). На "Рынке" игрок может купить или продать какой-либо товар за свою цену.

### Прочие сервисы (коротко):

- **МИНИМУМ:**

1. **⌚️ Рандомайзер** - представляет собой магазин контейнеров (до 20 различных видов), которые пользователь может купить за определённую цену. При открытии ему может выпасть с некоторым шансом редкие предметы, при этом какой-либо приз при открытии гарантируется.
2. **🔑 Личный кабинет** - каждый авторизированный пользователь может внести информацию о себе в личном кабинете.
3. **⚖️ Рынок** - представляет собой площадку, на которой авторизированные игроки могут выкладывать какие-либо товары за свою цену.

- **ДОПОЛНИТЕЛЬНО:**

4. **📖 Таблица лидеров** - показывает топ-10 игроков как по определённым критериям, так и в совокупности.
5. **⚔️ Глобальная карта** - есть некоторое количество источников (общие для всех игроков), которые добывают редкие материалы (их можно использовать для создания предметов в "Мастерской"). Материалы источника присваиваются тому игроку, который его контролирует. Чтобы завладеть источником, необходимо победить армию другого игрока, который владеет данным источником. Если же источник никем не контролируется, его может занять любой игрок.
6. **🛡 Армия** - каждый игрок может владеть войнами. Их можно купить на рынке (в доп. вкладке) за фиксированную цену. Подразумевается 2 типа войнов:
   - **Войн-защитник** - лучше подходит для защиты
   - **Войн-штурмовик** - лучше подходит для атаки
7. **⚙️ Мастерская** - открывается на определённом уровне развития, в ней можно создавать различные предметы за ресурсы, которые добываются в источниках в режиме "Глобальная карта".

---

### 🔒 Преимущества авторизированного пользователя над не авторизированным:

- ✅ Сохраняется весь прогресс.
- ✅ Доступ к более широкому ассортименту товаров, сервисам.
- ✅ Возможность настраивать профиль.
- ✅ Ежедневные бонусы.

## **Техническое задание:**

- **МИНИМУМ:**

🔵 **Реализация кликера, при каждом клике игрок получает некоторую валюту:**

    - Игрок может кликать на некоторую сущность.
    - Количество монет, получаемых при каждом клике (изначально = 1), зависит от уровня прокачки игрока.
    - За монеты игрок может купить себе улучшения: разовые и на постоянную основу.
    - После достижения определённого количества монет, сущность будет улучшаться (другая иконка).

🔵 **Реализация авторизации и регистрации пользователей:**

    - Регистрация: 3 поля: логин, пароль, повторите пароль
    - Авторизация: 2 поля: логин, пароль

🔵 **Реализация личного кабинета пользователя со следующими данными:**

    - Уникальный никнейм (изменяем за определённое количество ресурсов, начальный никнейм можно поменять бесплатно)
    - Своё описание (изменяемо)
    - Дата создания аккаунта
    - Награды

🔵 **Реализация открытия новых сервисов для игрока после достижения определённого уровня развития:**

    - Достигнув какой-либо отметки: количество монет, другой валюты, пользователю (обязательно только авторизованному) открываются новые сервисы: "Рынок" и "Рандомайзер" (каждый сервис открывается независимо друг от друга, для открытия каждого сервиса своё условие открытия).
    - Сервисы открываются только один раз и далее не могут никак закрыться для данного пользователя, даже если он не соответствует некоторым критериям, необходимым для открытия какого-либо сервиса.

🔵 **Реализация общего рынка товаров:**

**Только для пользователей, у которых этот сервис уже открыт:**

    - Каждый игрок может предложить свой товар за свою цену на рынке.
    - Каждый игрок может купить товар другого
    - Возможность поиска по товарам
    - Возможность применить фильтры
    - Реализовать пагинацию

🔵 **Реализация страницы с контейнерами:**

**Только для пользователей, у которых этот сервис уже открыт:**

    - Общее количество разнообразных контейнеров, которые можно приобрести: до 20. Есть ограничение на количество хранимых контейнеров (условно, до 100 контейнеров на каждого пользователя)
    - Гарантированный приз, возможность получить редкие и дорогие предметы. В случае, если предмет уже есть у пользователя, начисляется компенсация в виде валюты.
    - Можно покупать неограниченное количество (но не хранить).
    - Возможность выставить на продажу контейнер за свою цену.
    - Для каждого контейнера дополнительно можно купить ключ, который увеличивает шанс получения более ценных ресурсов (но при этом его наличие не обязательно для открытия самого контейнера).

- **ДОПОЛНИТЕЛЬНО**

🔵 **Реализация "Мастерской":**

    - Открывается на определённом уровне развития.
    - Можно собирать из деталей предметы различной стоимости и редкости, в дальнейшем продавать их.
    - На создание каждого предмета уходит определённое количество времени.

🔵 **Реализация "Глобальной карты":**

    - Есть некоторые источники, которые добывают детали для "Мастерской". Общее количество источников небольшое (до 10), они общие для всех игроков. Каждый игрок может взять под контроль эти источники (как отдельные, так и все).
    - Для взятия под контроль какого-либо источника необходимо победить армию другого игрока. Побеждает тот игрок, у кого больше сил. Сила определяется для обороняющегося и атакующего игрока по-разному. Ориентировочная формула для обороняющегося: Сила = ((количество войнов-защитников) * 1.5 + (количество войнов-штурмовиков * 0.8)) * 1.5. В обороне сила армии увеличивается в 1.5 раза, т.к. защищаться легче, чем нападать. Ориентировочная формула для атакующего: Сила = (количество войнов-штурмовиков) * 1.5 + (количество войнов-защитников * 0.8). В ходе сражения оба игрока несут потери. По окончании битвы у проигравшего остаётся небольшое количество воинов (определённый % от общего количества, некоторые войны смогли остаться целыми после битвы), у победителя уменьшается количество воинов по определённой формуле (количество воинов противника / 2).
    - Источник может быть никем не занят, тогда любой игрок может завладеть им.
    - Ресурсы, добываемые из источника, можно продавать на рынке, либо использовать их для создания предметов в "Мастерской".

🔵 **Реализовать таблицу лидеров:**

    - Возможность просмотра таблицы по определённому параметру (ресурсу, уровню развития)

🔵 **Адаптивность ко всему приложению**

## Стек:

- **Frontend**: HTML, SCSS (модули), TypeScript, React, Redux Toolkit, FSD (архитектура), Vite (сборщик)
- **Backend**: Python, Flask

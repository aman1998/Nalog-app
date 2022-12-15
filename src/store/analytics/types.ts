{/* eslint-disable max-len */}

export interface ISendGAStatisticPayload {
  event: EEventType | string;
}

export enum EEventType {
  /**
   *  Авторизация
   */
  // * Регистрация
  REGISTRATION_SENT = 'registration_sent', // Отправка почты/телефона и пароля для регистрации
  REGISTRATION_SUCCESS = 'registration_success', // Завершение регистрации по почте/Завершение регистрации по телефону

  // * Вход
  LOGIN_SENT = 'login_sent', // Отправка почты/телефона и пароля для входа
  LOGIN_SUCCESS = 'login_success', // Успешный вход в ЛК
  LOGIN_FORM_REG_LINK = 'login_form_reg_link', // Клик по ссылке "Регистрация" на форме входа

  // * Сессии
  AUH_SESSION_NEW = 'auth:session:new', // Начало новой сессии. Возможные кейсы: 1. Токен уже хранился в localStorage.Открытие в новой вкладке создает новую сессию. 2. Пользователь сделал логин и получил токен. 3. Пользователь зарегистрировался и получил токен.
  AUH_SESSION_LOGOUT = 'auth:session:logout', // Пользователь выполнил логаут

  LOGOUT = 'logout',
  SIGN_IN_CLICKED = 'signInClicked',

  DOCS_POPUP_CONTINUE_TAXREPORT = 'docs_popup_continue_taxreport',
  DOCS_POPUP_CONTINUE_TAXREPORT_YES = 'docs_popup_continue_taxreport_yes',
  DOCS_POPUP_CONTINUE_TAXREPORT_CREATE_NEW = 'docs_popup_continue_taxreport_create_new',
  DOCS_TAXREPORT_DRAFT_OPEN = 'docs_taxreport_draft_open',
  DOCS_TAXREPORT_FORMED_OPEN = 'docs_taxreport_formed_open',

  TAXREPORT_STEP1_NEW_CREATED = 'taxreport_step1_new_created',
  TAXREPORT_STEP1_SAVED = 'taxreport_step1_saved',
  TAXREPORT_STEP2_SAVED = 'taxreport_step2_saved',
  TAXREPORT_STEP3_SAVED_FULLY = 'taxreport_step3_saved_fully',
  TAXREPORT_STEP3_SAVED_AS_ANONYMOUS = 'taxreport_step3_saved_as_anonymous',
  TAXREPORT_STEP3_COMPLETED = 'taxreport_step3_completed',

  TAXREPORT_STEP1_TRANSACTIONS_ERROR = 'taxreport_step1_transactions_error',
  TAXREPORT_STEP3_FORMING_ERROR = 'taxreport_step3_forming_error',

  TAXREPORT_STEP1_ACCOUNTS_CHANGED = 'taxreport_step1_accounts_changed',
  TAXREPORT_STEP1_ACCOUNTS_ADDED = 'taxreport_step1_account_added',
  TAXREPORT_STEP2_TRANSACTION_ADDED = 'taxreport_step2_transaction_added',
  TAXREPORT_STEP2_TRANSACTION_CHECKED_CHANGED = 'taxreport_step2_transaction_checked_changed',

  TAXREPORT_STEP1_EXIT = 'taxreport_step1_exit',
  TAXREPORT_STEP2_EXIT = 'taxreport_step2_exit',
  TAXREPORT_STEP3_EXIT = 'taxreport_step3_exit',

  TAXREPORT_STEP3_TO_STEP2 = 'taxreport_step3_to_step2',
  TAXREPORT_STEP3_TO_STEP1 = 'taxreport_step3_to_step1',
  TAXREPORT_STEP2_TO_STEP1 = 'taxreport_step2_to_step1',
  TAXREPORT_STEP1_CANCEL = 'taxreport_step1_cancel',
  TAXREPORT_STEP2_CANCEL = 'taxreport_step2_cancel',
  TAXREPORT_STEP3_CANCEL = 'taxreport_step3_cancel',

  TAXREPORT_STEP3_IFNS_ERROR = 'taxreport_step3_ifns_error',
  TAXREPORT_STEP3_OKTMO_ERROR = 'taxreport_step3_oktmo_error',
  TAXREPORT_STEP3_INN_ERROR = 'taxreport_step3_inn_error',

  // УСЛОВИЕ - УСЛУГА НЕ АКТИВИРОВАНА
  TAXREPORT_STEP2_PAYMENT_REQUESTED = 'taxreport_step2_payment_requested',
  TAXREPORT_STEP2_PAYMENT_STARTED = 'taxreport_step2_payment_started',
  TAXREPORT_STEP2_PAYMENT_CANCELED = 'taxreport_step2_payment_canceled',

  // УСЛОВИЕ - ДЕКЛАРАЦИЯ СФОРМИРОВАНА
  TAXREPORT_FORMED_TRANSACTIONS_SHOWN = 'taxreport_formed_transactions_shown',
  TAXREPORT_FORMED_ALL_DELETE = 'taxreport_formed_all_deleted',

  /**
   *  Биржи и кошельки
   */
  // * Общие события страницы
  WALLET_ADD_NEW = 'wallets:add-new', // Нажатие на кнопку "Добавить"
  WALLET_SHOW_ACCOUNT_INFO = 'wallets:show-account-info', // Клик по конкретному аккаунту (левый столбец на десктопе и список в мобилке) для отображения информации об аккаунте

  // * Попап "Добавление аккаунта"
  WALLET_NEW_ACCOUNT_STEP_1_START = 'wallets:new:step1:start', // Отображение Шага 1 добавления аккаунта
  WALLET_NEW_ACCOUNT_STEP_1_NOT_FOUND = 'wallets:new:step1:not-found', // В поиске на Шаге 1 вбили строку, для которой не были найдены биржи или кошельки
  WALLET_NEW_ACCOUNT_STEP_1_SHOW_ALL = 'wallets:new:step1:show-all', // Клик по вкладке "Все". При первом показе (когда "Все" стоит по дефолту) событие не вызываем - только смена вкладки.
  WALLET_NEW_ACCOUNT_STEP_1_SHOW_EXCHANGES = 'wallets:new:step1:show-exchanges', // Клик по вкладке "Биржи"
  WALLET_NEW_ACCOUNT_STEP_1_SHOW_WALLETS = 'wallets:new:step1:show-wallets', // Клик по вкладке "Кошельки"
  WALLET_NEW_ACCOUNT_STEP_1_SHOW_BLOCKCHAINS = 'wallets:new:step1:show-blockchains', // Клик по вкладке "Блокчейны"
  WALLET_NEW_ACCOUNT_STEP_1_CLOSE = 'wallets:new:step1:close', // Закрытие попапа "Добавление аккаунта" на Шаге 1 (крестик или клик за пределы попапа)
  // wallets:new_account:step2:start:{stock_code}
  WALLET_NEW_ACCOUNT_STEP_2_START = 'wallets:new:step2:start', // Выбор сервиса для второго шага
  // wallets:new_account:step2:finishing:{stock_code}
  WALLET_NEW_ACCOUNT_STEP_2_FINISHING = 'wallets:new:step2:finishing', // Нажатие на кнопку "Импорт" ("Защищенный импорт").Отправка запроса за бэк.
  // wallets:new_account:step2:success:{stock_code}
  WALLET_NEW_ACCOUNT_STEP_2_SUCCESS = 'wallets:new:step2:success', // Успешное завершение создания аккаунта
  // wallets:new_account:step2:fail:{stock_code}
  WALLET_NEW_ACCOUNT_STEP_2_FAIL = 'wallets:new:step2:fail', // Ошибка с сервера при создании аккаунта
  WALLET_NEW_ACCOUNT_STEP_2_CLOSE = 'wallets:new:step2:close', // Закрытие попапа "Добавление аккаунта" на Шаге 2 (крестик или клик за пределы попапа)
  WALLET_NEW_ACCOUNT_STEP_2_GO_BACK = 'wallets:new:step2:go-back', // Возврат с Шага 2 на Шаг 1 (стрелкой назад)

  // * Информация об аккаунте
  WALLETS_ACCOUNT_INFO = 'wallets:account:info', // Отображение блока "Информация об аккаунте"
  WALLETS_ACCOUNT_SYNC = 'wallets:account:sync', // Нажатие на кнопку "Синхронизировать" (или на пункт из выпадающего меню в мобилке)
  WALLETS_ACCOUNT_RENAME_START = 'wallets:account:rename:start', // Нажатие на "Переименовать" в выпадающем меню
  WALLETS_ACCOUNT_RENAME_SUCCESS = 'wallets:account:rename:success', // Успешное завершение переименования аккаунта
  WALLETS_ACCOUNT_CONFIGURE_START = 'wallets:account:configure:start', // Нажатие на "Параметры синхронизации" в выпадающем меню
  WALLETS_ACCOUNT_CONFIGURE_SUCCESS = 'wallets:account:configure:success', // Успешное завершение смены параметров синхронизации аккаунта
  WALLETS_ACCOUNT_DELETE_START = 'wallets:account:delete:start', // Нажатие на "Удалить аккаунт" в выпадающем меню
  WALLETS_ACCOUNT_DELETE_SUCCESS = 'wallets:account:delete:success', // Успешное завершение удаления аккаунта
  WALLETS_ACCOUNT_SHOW_MORE_ASSETS = 'wallets:account:show-more-assets', // Клик на "Показать еще"
  WALLETS_ACCOUNT_SHOW_MORE_TRANSACTIONS = 'wallets:account:show-transactions', // Клик на транзакции, которые потом открывают страницу "Операции"


  /**
   *  Дашборд
   */
  // * Виджеты
  DASHBOARD_ACCOUNTS_ADD_FIRST = 'dashboard:accounts:add-first', // Виджет "Accounts". Нажатие на кнопку "Добавить".
  DASHBOARD_ACCOUNTS_ADD_NEW = 'dashboard:accounts:add-new', // Виджет "Accounts". Нажатие на кнопку "+" для добавления аккаунта.
  DASHBOARD_ACCOUNTS_SYNC = 'dashboard:accounts:sync', // Виджет "Accounts". Запуск синхронизации.
  DASHBOARD_TAXES_ADD_ACCOUNT = 'dashboard:taxes:add-account', // Виджет "Taxes". Начало добавления аккаунта, если аккаунтов нет (клик на заглушку).
  DASHBOARD_TAXES_SHOW_DETAILS = 'dashboard:taxes:show-details', // Виджет "Taxes". Переход на страницу "Документы" после клик на налог одного из годов.
  DASHBOARD_ASSETS_ADD_ACCOUNT = 'dashboard:assets:add-account', // Виджет "Asset". Начало добавления аккаунта, если аккаунтов нет (клик на заглушку).
  DASHBOARD_ASSETS_SHOW_ALL = 'dashboard:assets:show-all', // Виджет "Asset". Клик на "Смотреть все".

  // * Символы
  DASHBOARD_SYMBOLS_HOVER = 'dashboard:symbols:hover', // Наведение на символ на десктопе
  DASHBOARD_SYMBOLS_CONFIGURE = 'dashboard:symbols:configure', // Нажатие на кнопку настроек символов (шестеренку)
  DASHBOARD_SYMBOLS_SAVE_CONFIG = 'dashboard:symbols:save-config', // Сохранение кастомного набора символов
  DASHBOARD_SYMBOLS_CLOSE_CONFIG = 'dashboard:symbols:close-config', // Закрытие окна настройки символов без сохранения

  // * Туториал
  DASHBOARD_SHOW_TUTORIAL = 'dashboard:show-tutorial', // Клик на "How to Use".

  // * Виджет "Asset Value"
  DASHBOARD_ASSETS_VALUE_SHOW_7_DAYS = "dashboard:asset-value:show-7-days", // Клик на режим "7 дней"
  DASHBOARD_ASSETS_VALUE_SHOW_30_DAYS = "dashboard:asset-value:show-30-days", // Клик на режим "30 дней"
  DASHBOARD_ASSETS_VALUE_SHOW_2022 = "dashboard:asset-value:show-2022", // Клик на режим "2022"
  DASHBOARD_ASSETS_VALUE_SHOW_2021 = "dashboard:asset-value:show-2021", // Клик на режим "2021"
  DASHBOARD_ASSETS_VALUE_SHOW_CUSTOM_PERIOD = "dashboard:asset-value:show-custom-period", // Установление кастомного диапазона дат
  DASHBOARD_ASSETS_VALUE_INTERACTION = "dashboard:asset-value:interaction", // Пользователя навел курсор мыши на показания графика. Отправляем событие лишь один раз в рамках существования инстанса графика.

  // * Виджет "Asset Distribution"
  DASHBOARD_DISTRIBUTION_SHOW_EXCHANGE = "dashboard:distribution:show-exchanges", // Клик на режим "Биржи"
  DASHBOARD_DISTRIBUTION_SHOW_ASSETS = "dashboard:distribution:show-assets", // Клик на режим "Криптоактивы"
  DASHBOARD_DISTRIBUTION_SHOW_INTERACTION = "dashboard:distribution:interaction", // Пользователя навел курсор мыши на сектор диаграммы. Отправляем событие лишь один раз в рамках существования инстанса диаграммы.

  // * Виджет "P2P Exchange"
  DASHBOARD_P2P_SHOW_TODAY = "dashboard:p2p:show-today", // Клик на режим "Сегодня"
  DASHBOARD_P2P_SHOW_7_DAYS = "dashboard:p2p:show-7-days", // Клик на режим "7 дней"
  DASHBOARD_P2P_SHOW_14_DAYS = "dashboard:p2p:show-14-days", // Клик на режим "7 дней"
  DASHBOARD_P2P_SHOW_30_DAYS = "dashboard:p2p:show-30-days", // Клик на режим "30 дней"
  DASHBOARD_P2P_INTERACTION = "dashboard:p2p:interaction", // Пользователя навел курсор мыши на столбец графика. Отправляем событие лишь один раз в рамках существования инстанса графика.
}

export default {
  todaysDate: "Hoy ru {{date, YYYY-MM-DD}}",
  index: "TMbots - сервис автоматизированного мониторинга торговых марок",
  pages: {
    sidebar: {
      create_query: 'Поисковые запросы',
      all_query: 'Все результаты поиска',
      new_query: 'Создать новый поиск',
      balance: 'Баланс',
      user_data: 'Мои данные',
    },
    navbar: {
      test_user: 'пробный режим до',
      no_test_user: 'Дата не определена',
      lang: "Язык",
      languages: {
        ua: 'Українська',
        ru: 'Русский',
        en: 'English',
        pl: 'Polski'
      },
      content: {
        cabinet: "Кабинет",
        exit: "Выйти",
        login: "Войти",
        register: "Зарегистрироваться"
      },
    },
    home: {
      banner: {
        title: 'Сервис автоматического мониторинга торговых марок',
        subtitle: 'С TMbots вы можете создавать роботов, которые будут систематически проверять заявки на регистрацию торговых марок и сообщать о тех, которые соответствуют выбранным критериям. Полученная информация позволит вовремя выявить риски регистрации похожих ТМ и подать возражения против их регистрации, а также отслеживать активность конкурентов и рынка.',
      },
      button: 'попробовать 1 месяц бесплатно',
      service: {
        fasttext: {
          title: 'Быстро',
          subtitle: 'Всего раз необходимо потратить несколько минут на формирование поискового запроса и получайте отчеты о поиске ежемесячно, еженедельно или в реальном времени*. Отчеты отправляются на вашу электронную почту и хранятся в личном кабинете.'
        },
        simple: {
          title: 'Просто и удобно',
          subtitle: 'Интерфейс создан таким образом, чтобы даже не специалисту было легко ориентироваться в настройках. Вы всегда можете донастроить поисковый запрос "на лету", а наши специалисты всегда готовы помочь сформировать запрос.'
        },
        realibility: {
          title: 'Надежно',
          subtitle: 'Мониторинг торговых марок осуществляет программа-робот, что исключает вероятность технических ошибок и человеческий фактор. Каждый новый отчет содержит информацию за определенный предыдущий период, который охватывает все заявки по которым не завершился срок подачи возражений.'
        },
        reasprice: {
          title: 'Доступно',
          subtitle: 'Невысокая стоимость одного отчета в сочетании с возможностью регулировать частоту проверки позволяет достичь минимальных затрат. Чем больше поисков покупается - тем меньше стоимость одного поиска.'
        },
      },
      price: {
        title: 'Пакетные предложения мониторинга',
        contractual: 'по договору'
      },
      partners: {
        title: 'Нашим сервисом уже пользуются',
      },
      month: 'мес.',
      year: 'год',
      currency: 'грн',
      alternative: 'или',
      contracting: 'договорная'
    },
    login: {
      title: "Войти в личный кабинет",
      subtitle: 'Для уже зарегистрированных пользователей',
      content: {
        mail_label: "Укажите свой E-mail",
        mail_err: 'Email введен неверно',
        pass_label: "Укажите свой пароль",
        pass_err: "Пароль введен неверно",
      },
      qa: 'Если вы забыли пароль:',
      restore_pass: 'создать новый пароль',
      button: 'Продолжить'
    },
    register: {
      title: "Регистрация",
      subtitle: 'Для регистрации необходимо указать адрес электронной почты, на который будет отправлено ссылку для подтверждения регистрации.',
      content: {
        mail_label: "Укажите свой E-mail",
        mail_err: 'Правильный формат - example@yourfirm.com',
        pass_label: "Укажите свой пароль",
        pass_err: "Пароль должен быть не менее 8 символов и состоять из цифр и латинских букв",
        recaptcha_err: "Выберите пожалуйста recaptcha",
      },
      test_user: 'Пробный режим',
      qa: 'Уже зарегистрированы?',
      login: 'Войдите в кабинет',
      button: 'Продолжить'
    },
    finish_register: {
      title: "Проверьте вашу почту",
      subtitle: 'Мы отправили email со ссылкой для завершения регистрации на email',
    },
    remind_password: {
      title: "Восстановить пароль",
      subtitle: 'Введите E-mail в поле ниже и мы отправим вам письмо с cылкой для установки нового пароля',
      content: {
        mail_label: "Укажите свой E-mail",
        mail_err: 'Email введен неверно',
      },
      button: 'Продолжить'
    },
    finish_reset_pass: {
      title: "Проверьте вашу почту",
      subtitle: 'Мы отправили на email ссылку для восстановления пароля',
    },
    footer: {
      service: {
        title: 'О сервисе',
        howdoesitwork: 'Как это работает'
      },
      client: {
        title: 'Полезная информация',
        createrequest: 'Как создавать поисковый запрос',
        faq: 'Вопросы и ответы',
        ourotherservices: 'Наши другие сервисы',
      },
      legalinfo: {
        title: 'Юридическая информация',
        publicoffer: 'Публичная оферта',
        rules: 'Правила использования',
        ipr: 'Интеллектуальная собственность и персональные данные',
      },
      contact: {
        title: 'Контакты',
        aboutholder: 'Физическое лицо - предприниматель Атаманчук Андрей Геннадиевич. Адрес офиса: ул. Иоанна Павла ІІ, 4/6а, оф. 404, г. Киев, 04014 email: mail@tmbots.com',
      },
    },
    create_new_search_query: {
      title: 'Создание нового поискового запроса',
      edit_title: 'Редактирование поискового запроса',
      prolong_modal_title: 'Выберите условия продления (возобновления) поискового запроса',
      choose_country: {
        title: 'Выбрать страну',
        country_ua: 'Украина',
        country_us: 'США',
        country_pl: 'Польша',
        placeholder: 'Выбор базы данных торговых марок страны',
        err: 'Добавить страну'
      },
      search_criteria: {
        title: 'Критерии поиска',
        keywords_btn: 'Ключевые слова и классы',
        owners_btn: 'Наименование заявителя',
        class_btn: 'Классы товаров и услуг'
      },
      choose_owners_name: {
        title: 'Выбрать или указать наименование заявителя или владельца',
        err: 'Выберите наименование заявителя'
      },
      choose_keywords: {
        title: 'Ключевые слова',
        placeholder: 'До 5-ти ключевых слов (одно слово, сочетание цифр)',
        err: 'Добавьте ключевые слова от одного до трех'
      },
      checkboxes: {
        transliteration: 'Транслитерация',
        verbal_writing_numbers: 'Конвертация цифры / слово',
        phonetic_similarity: 'Фонетическая схожесть',
        special_characters: 'Использовать спецсимволы',
        full_text_search: 'Полнотекстовый поиск',
      },
      class_product: {
        title: 'Классы товаров и услуг',
        placeholder: 'Можно выбрать один класс МКТУ',
        err: 'Выберите класс товара и услуги',
      },
      classes_product: {
        title: 'Классы товаров и услуг',
        placeholder: 'Можно выбрать до трех классов МКТУ',
        err: 'Выберите классы товаров и услуг',
      },
      img_classes: {
        title: 'Классы изобразительных элементов',
        placeholder: 'Выберите до 3-х классов товаров или услуг',
        err: 'Выберите классы изобразительных элементов',
        choose_all_btn: 'Выбрать всю группу',
        collapse_class_btn: 'Свернуть',
        expand_class_btn: 'Развернуть',
      },
      search_duration: {
        title: 'Длительность мониторинга',
        month_12: '12 месяцев',
        month_6: '6 месяцев',
      },
      frequency_reports: {
        title: 'Частота проверки и отчетов',
        monthly: 'ежемесячно',
        weekly: 'еженедельно',
        daily: 'ежедневно',
      },
      choose_day: {
        title: 'День недели проведения поиска',
        placeholder: 'Выберите день недели',
        days: {
          name0: 'Понедельник',
          name1: 'Вторник',
          name2: 'Среда',
          name3: 'Четверг',
          name4: "Пятниця",
          name5: 'Суббота',
          name6: "Воскресенье",
        },
        err: 'Выберите день недели',
      },
      count_balance: 'У вас осталось поисков',
      success_create_query: 'Поисковый запрос успешно создан',
      success_saved_query: 'Поисковый запрос успешно сохранен',
      button: 'Создать и запустить',
      save_button: 'Сохранить и запустить',
      save_modal_button: 'продолжить',
    },
    main_search_query: {
      title: 'Поисковые запросы',
      tile_btn: 'Плитка',
      list_btn: 'Список',
      actions_query_placeholder: 'Действия над группой запросов',
      create_new_query_btn: 'Создать новый запрос',
      dialog_qa: 'Вы уверены, что хотите выполнить действие?',
      stop_status: 'Да',
      close_btn: 'Нет',
      alert_to_stop_query: 'Остановить выбранный запрос',
      alert_to_restore_queries: 'Восстановить выбранные запросы',
      err: 'Выберите запрос, который необходимо остановить',
    },
    list_page: {
      currentPageReportViewed: 'Отображается',
      views: 'записей',
      empty_data: 'Данные отсутствуют.',
      loading_data: 'Данные загружаются. Пожалуйста, подождите.',
      status: 'Статус',
      keyword: 'Ключевое слово',
      quantity: 'МКТУ',
      productclasses: 'Классы товаров',
      mkze: 'МКИЭ',
      applicant: 'Заявитель',
      term: 'Действует до',
      frequency: 'Частота',
      reports: 'Отчеты',
      edit: 'Редактировать',
      monthly: 'ежемесячно',
      weekly: 'еженедельно',
      daily: 'ежедневно',
      continue: 'Продолжить',
      review: 'Посмотреть',
      choose_query: 'Выбрать запрос'
    },
    search_results_reports: {
      title: 'Отчеты по результатам поиска',
      date_application_submission: 'Дата подачи заявки',
      reg_date: 'Дата регистрации',
      key_words: 'Ключевые слова',
      quantity: 'МКТУ',
      mkze: 'МКИЭ',
      applicant: 'Заявитель',
      search_date: 'Дата поиска',
      applicant_name_address: 'Наименование и адрес заявителя',
      name_address_representative: 'Имя и адрес представителя',
      mailing_address: 'Адрес для переписки',
      viennese_classification: 'Венская классификация',
      sign_image: 'Изображение знака',
      indices_Nice_classification: 'Индексы Ниццкой классификации',
      dialog_success: 'Отчет успешно отправлен на почту',
      send_to_email: 'прислать на почту',
      empty_data: 'Данные отсутствуют',
    },
    all_search_results_reports: {
      title: 'Все результаты поиска',
    },
    balance: {
      title: 'Пополнение баланса',
      user_balance: 'На вашем балансе',
      batch_replenishment: 'Пакетное пополнение',
      searches: 'поисков',
      one_search_cost: 'стоимость одного поиска',
      usage_example: 'Пример использования',
      empty_data: 'Данные отсутствуют',
      selected: 'Выбрано',
      choose: 'Выбрать',
      cost_quantity: 'Оплата осуществляется в безналичной форме, согласно счету',
      search_quantity: 'Количество поисков',
      cost_one_searching: 'Стоимость одного поиска',
      continue_btn: 'Продолжить',
      upload_account_to_mail: 'Загрузите счет или пришлите на свою почту',
      pdf_download_format: 'Скачать в формате pdf',
      send_to_mail: 'Отправить по почте',
      success_modalsPDFText: 'Счет успешно загружен',
      success_modalsEmailText: 'Счет отправлен на вашу почту',
      month: 'месяц',
      year: 'год',
      currency: 'грн',
    },
    juridical_edit: {
      title: 'Мои данные',
      client_id: 'клиента',
      fieldset_name: 'Наименование',
      fieldset_name_err: 'Недостаточное количество символов',
      fieldset_registeraddress: 'Адрес регистрации',
      codeERDPO: 'Код ЕГРПОУ',
      fieldset_email: 'Email',
      fieldset_email_err: 'Неправильный формат email',
      fieldset_letteraddress: 'Адрес для переписки',
      fieldset_telephone: 'Номер телефона',
      fieldset_telephone_err: 'Неправильный формат номера',
      fieldset_contactperson: 'Контактное лицо',
      cancel_btn: 'Отменить',
      save_btn: 'Сохранить',
      edit_btn: 'Редактировать информацию',
    },
    physical_edit: {
      client_id: 'клиента',
      title: 'Мои данные',
      fieldset_surname: 'Фамилия',
      fieldset_surname_err: 'Недостаточное количество символов',
      fieldset_name: 'Имя',
      fieldset_name_err: 'Недостаточное количество символов',
      fieldset_secondname: 'Отчество',
      fieldset_secondname_err: 'Недостаточное количество символов',
      fieldset_email: 'Email',
      fieldset_email_err: 'Неправильный формат email',
      fieldset_letteraddress: 'Адрес для переписки',
      fieldset_telephone: 'Телефон',
      fieldset_telephone_err: 'Неправильный формат номера',
      cancel_btn: 'Отменить',
      save_btn: 'Сохранить',
      edit_btn: 'Редактировать информацию',
    },
    user_balance: {
      title: 'Баланс',
      top_up_balance: 'Пополнить баланс'
    },
    change_old_pass: {
      title: "Смена пароля",
      pass_title: "Пароль доступа",
      old_password: 'Введите ваш старый пароль',
      old_password_err: "Недостаточное количество символов",
      new_password: 'Введите ваш новый пароль',
      new_password_err: "Пароль введен неверно",
      repead_password: 'Повторите новый пароль',
      repead_password_err: "Пароли должны совпадать",
      button: 'Продолжить',
      change_pass_button: 'Изменить пароль доступа',
      alert_success: 'Пароль успешно изменен'
    },
    user_profile_main: {
      title: 'Мои данные',
      juridical_btn: 'Юридическое лицо',
      physical_btn: 'Физическое лицо',
    },
    user_activation: 'Вы успешно авторизоваться. Пожалуйста, войдите в личный кабинет',
    not_found_page: 'Страница не найдена',
    serverError: 'Ошибка сервера. Попробуйте зайти через несколько минут'
  }
}

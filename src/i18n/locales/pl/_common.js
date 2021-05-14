export default {
  todaysDate: "Today is {{date, MM/DD/YYYY}}",
  index: "TMbots - usługa automatycznego monitorowania znaków towarowych",
  pages: {
    sidebar: {
      create_query: 'Zapytania do wyszukiwarki',
      all_query: 'Wszystkie wyniki wyszukiwania',
      new_query: 'Nowe wyszukiwanie',
      balance: 'Uzupełnić saldo',
      user_data: 'Moje dane',
    },
    navbar: {
      test_user: 'tryb testu do',
      no_test_user: 'Data nie została ustawiona',
      lang: "Język",
      languages: {
        ua: 'Українська',
        ru: 'Русский',
        en: 'English',
        pl: 'Polski'
      },
      content: {
        cabinet: "Panel klienta",
        exit: "Wyloguj się",
        login: "Zaloguj się",
        register: "Rejestracja"
      },
    },
    home: {
      banner: {
        title: 'Serwis automatycznego monitorowania znaków towarowych',
        subtitle: 'TMbots umożliwia użytkownikowi tworzenie własnych robotów, które na bieżąco sprawdzają zgłoszenia o rejestrację znaków towarowych, oraz informują o spełniających określone kryteria. Uzyskane informacje pozwalają na terminowe wykrycie ryzyka, związanego z rejestracją podobnych znaków towarowych i wniesienie sprzeciwu wobec ich rejestracji, a także monitorowanie aktywności konkurentów i rynku.'
      },
      button: 'wypróbuj za darmo przez 1 miesiąc',
      service: {
        fasttext: {
          title: 'Szybko',
          subtitle: 'Wystarczy tylko jeden raz poświęcić czas na utworzenie zapytania do wyszukiwarki a będziesz otrzymywać raporty co miesiąc, co tydzień lub codziennie. Raporty są wysyłane tylko na Twój e-mail.'
        },
        simple: {
          title: 'Proste i wygodne',
          subtitle: 'Interfejs systemu zaprojektowany jest w sposób, łatwy w obsłudze, aby w każdej chwili można było zmienić ustawienia wyszukiwania. Nasi specjaliści zawsze są do dyspozycji by pomóc w prawidłowym sformułowaniu zapytania do wyszukiwarki.'
        },
        realibility: {
          title: 'Niezawodnie',
          subtitle: 'Monitorowanie znaków towarowych dokonywane jest przez program-bot, co pozwala na eliminacje wystąpienia błędów technicznych i czynnika ludzkiego. Każdy nowy raport zawiera informacje za pewien poprzedni okres, który obejmuje wszystkie zgłoszenia, dla których nie upłynął termin złożenia sprzeciwu.'
        },
        reasprice: {
          title: 'Dostępnie',
          subtitle: 'Niski koszt jednego raportu w połączeniu z możliwością dostosowania częstotliwości przeglądów pozwala na osiągnięcie minimalnych kosztów. Im więcej kupujesz wyszukiwań, tym niższy jest koszt jednego wyszukiwania.'
        },
      },
      price: {
        title: 'Cena',
        contractual: 'do negocjacji'
      },
      partners: {
        title: 'Serwis TMBots już używany przez',
      },
      month: 'mes.',
      year: 'rok',
      currency: 'uah',
    },
    login: {
      title: "Zaloguj się",
      subtitle: 'Podaj swój E-mail i hasło',
      content: {
        mail_label: "Podaj swój E-mail",
        mail_err: 'Podany adres e-mail jest niepoprawny',
        pass_label: "Wymyśl hasło",
        pass_err: "Nieprawidłowe hasło",
      },
      qa: 'Zapomniałeś hasła?',
      restore_pass: 'Odzyskaj hasło',
      button: 'Kontynuuj'
    },
    register: {
      title: "Rejestracja",
      subtitle: 'Wpisz swój adres e-mail, a system prześle Ci maila z potwierdzeniem rejestracji',
      content: {
        mail_label: "Wpisz swój e-mail",
        mail_err: 'Niepoprawny format adresu e-mail. Poprawny format adresu e-mail (przykład): example@yourfirm.com',
        pass_label: "Podaj hasło",
        pass_err: "Hasło musi zawierać co najmniej 8 znaków oraz cyfry i litery łacińskie",
        recaptcha_err: "Proszę wybrać recaptcha",
      },
      test_user: 'Zaloguj się jako użytkownik w trybie testowym',
      qa: 'Jesteś już zarejestrowany?',
      login: 'Załoguj się do panelu klienta',
      button: 'Dalej'
    },
    finish_register: {
      title: "Sprawdź pocztę",
      subtitle: 'Wysłaliśmy wiadomość z linkiem do zakończenia rejestracji',
    },
    remind_password: {
      title: "Odzyskać hasło",
      subtitle: 'Wpisz swój e-mail w polu poniżej, a wyślemy Ci wiadomość z linkiem do ustawienia nowego hasła',
      content: {
        mail_label: "Wpisz swój e-mail",
        mail_err: 'Niepoprwany e-mail',
      },
      button: 'Dalej'
    },
    finish_reset_pass: {
      title: "Sprawdź pocztę",
      subtitle: 'Wysłaliśmy e-mail z linkiem do odzyskania hasła',
    },
    footer: {
      service: {
        title: 'Serwis',
        howdoesitwork: 'Jak to działa?'
      },
      client: {
        title: 'Klientowi',
        createrequest: 'Jak utworzyć zapytanie do wyszukiwarki',
        faq: 'Pytania i odpowiedzi',
        ourotherservices: 'Nasze inne serwisy',
      },
      legalinfo: {
        title: 'Informacje prawne',
        publicoffer: 'Oferta publiczna',
        rules: 'Warunki korzystania',
        ipr: 'Własność intelektualna',
      },
      contact: {
        title: 'Kontakty',
        aboutholder: 'Fizyczna osoba przedsiębiorcą Atamanchuk Andrii, siedziba: ul. Jana Pawła ІІ, 4/6а, biuro 404, m. Kijów, 04014, e-mail: mail@tmbots.com',
      },
    },
    create_new_search_query: {
      title: 'Utwórz nowe wyszukiwanie',
      edit_title: 'Edytuj wyszukiwanie',
      prolong_modal_title: 'Wybierz warunki kontynuacji (wznowienia) wyszukiwania',
      choose_country: {
        title: 'Wybierz kraj',
        country_ua: 'Ukraina',
        country_us: 'USA',
       // country_us: 'Polska',
        placeholder: 'Wybierz baze danych znaków towarowych kraju',
        err: 'Podaj kraj'
      },
      search_criteria: {
        title: 'Kryteria wyszukiwania',
        keywords_btn: 'Słowa kluczowe i klasy',
        owners_btn: 'Nazwa zgłaszającego',
        class_btn: 'Klasy towarów i usług'
      },
      choose_owners_name: {
        title: 'Wybierz nazwę zgłaszającego',
        err: 'Wybierz nazwę zgłaszającego'
      },
      choose_keywords: {
        title: 'Słowa kluczowe',
        placeholder: 'Pięć słowa kluczowe (jedno słowo, kombinacja liczb)',
        err: 'Wpisz słowa kluczowe od jednego do trzech'
      },
      checkboxes: {
        transliteration: 'W tym z transliteracją',
        verbal_writing_numbers: 'Słowny zapis liczb',
        phonetic_similarity: 'Podobieństwo fonetyczne',
        special_characters: 'Z użyciem znaków specjalnych',
        full_text_search: 'Wyszukiwanie pełnotekstowe',
      },
      class_product: {
        title: 'Klasy towarów i usług',
        placeholder: 'Wybierz klasę towarów i usług',
        err: 'Wybierz klasę towarów i usług',
      },
      classes_product: {
        title: 'Klasy towarów i usług',
        placeholder: 'Wybierz do 3. klasów towarów i usług',
        err: 'Wybierz klasy towarów i usług',
      },
      img_classes: {
        title: 'Klasy elementów graficznych',
        placeholder: 'Wybierz do 3. klasów towarów i usług',
        err: 'Wybierz klasy elementów graficznych',
        choose_all_btn: 'Wybierz całą grupę',
        collapse_class_btn: 'Zwiń',
        expand_class_btn: 'Rozwiń',
      },
      search_duration: {
        title: 'Okres wyszukiwania',
        month_12: '12 miesięcy',
        month_6: '6 miesięcy',
      },
      frequency_reports: {
        title: 'Częstotliwość wyszukiwania',
        monthly: 'comiesięcznie',
        weekly: 'cotygodniowo',
        daily: 'codziennie',
      },
      choose_day: {
        title: 'Wybierz dzień tygodnia, w którym chcesz otrzymywać raporty',
        placeholder: 'Wybierz dzień tygodnia',
        days: {
          name0: 'Poniedziałek',
          name1: 'Wtorek',
          name2: 'Środa',
          name3: 'Czwartek',
          name4: "Piątek",
          name5: 'Sobota',
          name6: "Niedziela",
        },
        err: 'Wybierz dzień tygodnia',
      },
      count_balance: 'Liczba wyszukiwań, które zostaną odpisane',
      success_create_query: 'Zapytanie do wyszukiwarki zostało pomyślnie utworzone',
      success_saved_query: 'Zapytanie do wyszukiwarki pomyślnie zapisane',
      button: 'Utwórz i uruchom',
      save_button: 'Zapisz i uruchom',
      save_modal_button: 'kontynuuj',
    },
    main_search_query: {
      title: 'Zapytania do wyszukiwarki',
      tile_btn: 'Kafelki',
      list_btn: 'Lista',
      actions_query_placeholder: 'Czynności z grupą zapytań',
      create_new_query_btn: 'Nowe zapytanie do wyszukiwarki',
      dialog_qa: 'Czy na pewno chcesz wykonać tę czynność?',
      stop_status: 'Tak',
      close_btn: 'Nie',
      alert_to_stop_query: 'Zatrzymaj wybrane zapytanie',
      alert_to_restore_queries: 'Przywróć wybrane zapytanie',
      err: 'Wybierz zapytanie do zatrzymania',
    },
    list_page: {
      currentPageReportViewed: 'Wyświetlane',
      views: 'wpisów',
      empty_data: 'Brak danych',
      loading_data: 'Pobieranie danych z pliku. Proszę czekać',
      status: 'Status',
      keyword: 'Słowo kluczowe',
      quantity: 'Klasyfikacja nicejska',
      productclasses: 'Klasy produktów',
      mkze: 'MKEGZ',
      applicant: 'Zgłaszający',
      term: 'Czynny do',
      frequency: 'Częstotliwość',
      reports: 'Raporty',
      edit: 'Edytuj',
      monthly: 'comiesięcznie',
      weekly: 'cotygodniowo',
      daily: 'codziennie',
      continue: 'Kontynuuj',
      review: ' Przejrzyj raport',
      choose_query: 'Wybierz zapytanie'
    },
    search_results_reports: {
      title: 'Raporty z wyników wyszukiwania',
      date_application_submission: 'Data złożenia zgłoszenia',
      reg_date: 'Data rejestracji',
      key_words: 'Słowa kluczowe',
      quantity: 'Klasyfikacja nicejska',
      mkze: 'MKEGZ',
      applicant: 'Zgłaszający',
      search_date: 'Data wyszukiwania',
      applicant_name_address: 'Nazwa i adres zgłaszającego',
      name_address_representative: 'Imię i nazwisko, adres przedstawiciela',
      mailing_address: 'Adres do korespondencji',
      viennese_classification: 'Klasyfikacja wiedeńska',
      sign_image: 'Obraz',
      indices_Nice_classification: 'Indeksy klasyfikacji nicejskiej',
      dialog_success: 'Raport pomyślnie wysłany pod e-mail',
      send_to_email: 'wysłać pod e-mail',
      empty_data: 'Brak danych',
    },
    all_search_results_reports: {
      title: 'Wszystkie wyniki wyszukiwania',
    },
    balance: {
      title: 'Uzupełnienie salda',
      user_balance: 'Na Twoim saldzie',
      batch_replenishment: 'Uzupełnienie pakietowe',
      searches: 'wyszukiwań',
      one_search_cost: 'koszt jednego wyszukiwania',
      usage_example: 'Przykład użycia',
      empty_data: 'Brak danych',
      selected: 'Wybrane',
      choose: 'Wybierz',
      cost_quantity: 'Cena w zależności od liczby',
      search_quantity: 'Liczba wyszukiwań',
      cost_one_searching: 'Cena jednego wyszukiwania',
      payments_forms: 'Płatność bezgotówkowo, na podstawie faktury',
      continue_btn: 'Kontynuuj',
      upload_account_to_mail: 'Pobierz fakturę lub wyślij na swój e-mail',
      pdf_download_format: 'Pobierz w pdf',
      send_to_mail: 'Wyślij pod e-mail',
      success_modalsPDFText: 'Faktura pomyślnie pobrana',
      success_modalsEmailText: 'Faktura została wysłana na Twój e-mail',
      month: 'miesiąc',
      year: 'rok',
      currency: 'uah',
    },
    juridical_edit: {
      title: 'Moje dane',
      client_id: 'klienta',
      fieldset_name: 'Nazwa',
      fieldset_name_err: 'Niewystarczająca liczba znaków',
      fieldset_registeraddress: 'Adres rejestracji',
      codeERDPO: 'REGON',
      fieldset_email: 'E-mail',
      fieldset_email_err: 'Niepoprawny format e-mail',
      fieldset_letteraddress: 'Adres do korespondencji',
      fieldset_telephone: 'Telefon',
      fieldset_telephone_err: 'Niepoprawny format telefonu',
      fieldset_contactperson: 'Osoba kontaktowa',
      cancel_btn: 'Anuluj',
      save_btn: 'Zachowaj',
      edit_btn: 'Edytuj informacje',
    },
    physical_edit: {
      client_id: 'klienta',
      title: 'Moje dane',
      fieldset_surname: 'Nazwisko',
      fieldset_surname_err: 'Niewystarczająca liczba znaków',
      fieldset_name: 'Imię',
      fieldset_name_err: 'Niewystarczająca liczba znaków',
      fieldset_secondname: 'Imię ojca',
      fieldset_secondname_err: 'Niewystarczająca liczba znaków',
      fieldset_email: 'E-mail',
      fieldset_email_err: 'Niepoprawny e-mail',
      fieldset_letteraddress: 'Adres do korespondencji',
      fieldset_telephone: 'Telefon',
      fieldset_telephone_err: 'Niepoprawny telefon',
      cancel_btn: 'Anuluj',
      save_btn: 'Zachowaj',
      edit_btn: 'Edytuj informacje',
    },
    user_balance: {
      title: 'Saldo',
      top_up_balance: 'Uzupełnij saldo'
    },
    change_old_pass: {
      title: "Zmiana hasła",
      pass_title: "Hasło",
      old_password: 'Wpisz stare hasło',
      old_password_err: "Niewystarczająca liczba znaków",
      new_password: 'Wpisz nowe hasło',
      new_password_err: "Niepoprawne hasło",
      repead_password: 'Powtórz nowe hasło',
      repead_password_err: "Hasła muszą być jednakowe",
      button: 'Kontynuuj',
      change_pass_button: 'Zmiań hasło',
      alert_success: 'Hasło pomyślnie zmienione'
    },
    user_profile_main: {
      title: 'Moje dane',
      juridical_btn: 'Podmiot prawny',
      physical_btn: 'Osoba fizyczna',
    },
    user_activation: 'Zalogowałeś się pomyślnie. Wejdź na swoje konto osobiste',
    not_found_page: 'Nie znaleziono strony',
    serverError: 'Błąd serwera. Spróbuj ponownie za kilka minut'
  }
}

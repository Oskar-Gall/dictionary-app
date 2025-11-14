# Aplikacja Słownik Angielski (Dictionary App)

Nowoczesna, responsywna aplikacja front-endowa typu "Słownik Angielski", która pobiera dane z darmowego API `dictionaryapi.dev`.

GitHub Pages: https://oskar-gall.github.io/dictionary-app/

---

## 🚀 Funkcje

* **Wyszukiwanie definicji:** Pobiera pełne dane na temat wprowadzonego słowa.
* **Odtwarzanie audio:** Umożliwia odsłuchanie poprawnej wymowy słowa (jeśli jest dostępna w API).
* **Szczegółowe definicje:** Wyświetla znaczenia pogrupowane według części mowy (rzeczownik, czasownik itp.).
* **Przykłady użycia:** Pokazuje przykładowe zdania dla każdej definicji.
* **Interaktywne tagi:** Wyświetla **synonimy** i **antonimy** jako klikalne tagi. Kliknięcie na tag automatycznie wyszukuje definicję dla tego słowa.
* **Obsługa błędów:** Wyświetla przyjazne komunikaty, jeśli słowo nie zostanie znalezione lub wystąpi błąd.
* **Nowoczesny UI:** Ciemny motyw (dark mode) i pełna responsywność (RWD).

---

## 🛠️ Użyte Technologie

* **HTML5:** Semantyczna struktura.
* **CSS3:**
    * Nowoczesny design (Dark Mode)
    * Zmienne CSS (CSS Variables)
    * Flexbox
    * Media Queries (RWD)
* **JavaScript (ES6+):**
    * Fetch API (do komunikacji z API)
    * Async/Await (do obsługi zapytań)
    * Dynamiczna manipulacja DOM
    * Obsługa zdarzeń (w tym delegacja zdarzeń dla audio i tagów)
* **API:**
    * **Free Dictionary API** (dictionaryapi.dev)

---

## 🏁 Uruchomienie

Ten projekt nie wymaga żadnych kluczy API ani specjalnej konfiguracji.

1.  Sklonuj repozytorium.

2.  Otwórz plik `index.html` w swojej ulubionej przeglądarce.

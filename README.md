## Projekt zaliczeniowy z laboratorium "Szkielety programistyczne w aplikacjach internetowych"

## Tematyka projektu: Strona pizzerii

## Autor: Kacper Klusek

## Funkcjonalności:
- uwierzytelnianie
- składanie zamówień
- składanie rezerwacji restauracji
- składanie skarg i pozwów
- panel administratora: zarządzanie użytkownikami, zamówieniami, dostępnymi pizzami, wyświetlanie wiadomości (pozwów i rezerwacji)

## Narzędzia i technologie:
- strona serwera: Node.js Express
- baza danych: MongoDB, ORM (mongoose)
- strona klienta: Vite, React, SweetAlert2 (wyświetlanie powiadomień), Flatpickr (kalendarz i wybór godzin do rezerwacji)

## Wymagania

Wersje programów wykorzystane do tworzenia aplikacji (aplikacja nie została przetestowana z kompatybilnością wcześniejszych wersji):
- Node 22.14.0

## Uruchomienie
1. Wypakować pliki projektu
2. W folderze client, w terminalu wpisać `npm install --legacy-peer-deps` w celu instalacji zaleznosci `node_modules`
3. W folderze server, w terminalu wpisać `npm install` w celu instalacji zaleznosci `node_modules`
8. Uruchomienie klienta poprzez wpisanie w terminalu `npm run dev` w folderze client
9. Uruchomienie serwera poprzez wpisanie w terminalu `npm run dev` w folderze server
10. Uruchomienie aplikacji w przeglądarce pod adresem: `localhost:5173`

## Uwagi
1. Projekt dostępny jest tez na profilu: **[GITHUB](https://github.com/KacperKlusek1/pizzeria_app_mern)**
2. Aplikacja łączy się z bazą danych MongoDB Cloud. Zmiana połączenia możliwa jest w pliku .env w katalogu server

## Konta testowe
-   **Admin**
    -   Login: admin
    -   Hasło: qwertyuiop
-   **Test**
    -   Login: test
    -   Hasło: qwerty

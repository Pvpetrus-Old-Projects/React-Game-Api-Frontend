# tworzenie aplikacji
- npx create-react-app game-app
# włączenie aplikacji
- cd game-app
- npm start
# instalacja serwera json-server
- npm install -g json-server
# włączenie serwera json-server
- json-server --watch db.json --port 8000
# generowanie komponentu
npx generate-react-cli component MyComponent 
# komponenty:
- gry
    - lista wszystkich dostępnych gier z możliwością filtrowania i sortowania oraz dodawania do ulubionych
- szczegóły konkretnej gry
    - szczegóły gry pobrane z api po id
- ulubione
    - w ulubionych przechowujemy indeks gry, ID po którym ściągamy detale z API oraz użytkownika który polubił grę
- logowanie
- rejestracja
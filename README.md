# Pizzeria Stella
Projekt to strona wykorzystująca bibliotekę Bootstrap do utworzenia strony pizzerii. 
DEMO: https://kamilz12.github.io/pizza-website/

## Wymagania

Do uruchomienia aplikacji potrzebujesz serwera Apache.

## Uruchomienie

1. **Uruchomienie serwera Apache:**
    - Uruchom serwer Apache na swoim lokalnym komputerze. Możesz użyć narzędzi takich jak XAMPP, WAMP, MAMP itp.
    - Upewnij się, że serwer Apache działa poprawnie i jest dostępny na lokalnym adresie.

2. **Kopiowanie plików projektu:**
    - Skopiuj wszystkie pliki projektu do katalogu głównego serwera Apache (np. htdocs w przypadku XAMPP).

3. **Uruchomienie aplikacji:**
    - Uruchom przeglądarkę internetową i przejdź do lokalnego adresu serwera Apache, gdzie znajduje się projekt.
4. **Poprawne działanie map**
    - Aby poprawnie działy mapy należy posiadać swój własny klucz do JavaScript API (docs: https://developers.google.com/maps/documentation/javascript) w pliku kontakt.html podstawiając twój klucz za YOUR API KEY
```
    <script async src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&loading=async&libraries=places&callback=initMap"></script>
```

## Technologie

Projekt wykorzystuje następujące technologie:

- **HTML5**:
- **CSS3**: 
- **Bootstrap**
- **JavaScript**: 
- **Fetch API**: Interfejs przeglądarki internetowej do wysyłania i pobierania danych z serwera. (wymagany serwer aby działało asynchroniczne pobiranie tekstów np Apache)
- **Maps JavaScript API** - API używane do geolokalizacji w projekcie

## Informacje dodatkowe
Projekt zakomentowany na potrzeby zajęć na studiach (wymagania dotyczące samodzielnego projektu), wykonany samodzielnie
## Autor

Ten projekt został stworzony przez kamilz12.

## Licencja

Ten projekt jest udostępniony na licencji MIT. Więcej informacji znajdziesz w pliku LICENSE.md.

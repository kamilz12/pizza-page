/*https://developers.google.com/maps/documentation/javascript - dokumentacja */
function initMap() {
  // Utwórz nową instancję mapy
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10, // Poziom przybliżenia mapy
    center: {lat: 51.23557, lng: 22.54897} // Współrzędne centrum mapy +
  });

  // Utwórz obiekt DirectionsService
  var directionsService = new google.maps.DirectionsService; // Obiekt DirectionsService służy do wysyłania zapytań do usługi Google Maps Directions API

  // Utwórz obiekt DirectionsRenderer
  var directionsDisplay = new google.maps.DirectionsRenderer({ // Obiekt DirectionsRenderer służy do renderowania trasy na mapie
    map: map
  });

  // Utwórz niestandardowy znacznik dla punktu początkowego (np. ikona)
  var startMarker = new google.maps.Marker({
    position: {lat: 51.23557, lng: 22.54897}, // Ustaw punkt początkowy na centrum mapy
    map: map,
    icon: {
      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png' // Adres URL ikony
    },
    label: {
      text: 'Pizzeria Stella', // Tekst etykiety
      color: 'black', // Kolor tekstu etykiety
      fontSize: '14px' // Rozmiar tekstu etykiety
    }
  });
  

  // Sprawdź, czy przeglądarka obsługuje geolokalizację
  if (navigator.geolocation) {
    // Metoda getCurrentPosition() obiektu navigator.geolocation pobiera aktualną lokalizację użytkownika
    navigator.geolocation.getCurrentPosition(function(position) { 
      // Ustal punkt początkowy
      var start = {
        lat: position.coords.latitude, // Pobierz szerokość geograficzną
        lng: position.coords.longitude // Pobierz długość geograficzną
      };

      // Ustal docelowe miejsce
      var end = 51.23557 + ',' + 22.54897;

      // Utwórz zapytanie dla DirectionsService
      var request = {
        origin: start, // Punkt początkowy
        destination: end, // Punkt docelowy
        travelMode: 'DRIVING' // Tryb podróży (np. DRIVING, WALKING, TRANSIT)
      };

      // Wywołaj DirectionsService, aby pobrać trasę
      directionsService.route(request, function(response, status) { 
        if (status === 'OK') {
          // Wyrenderuj trasę na mapie przy użyciu DirectionsRenderer
          directionsDisplay.setDirections(response);
        } else {
          // Obsłuż błędy, jeśli wystąpią
          window.alert('Wystąpił błąd: ' + status);
        }
      });
    }, function() {
      // Obsłuż błąd geolokalizacji
      handleLocationError(true, map.getCenter());
    });
  } else {
    // Przeglądarka nie obsługuje geolokalizacji
    handleLocationError(false, map.getCenter());
  }
}

// Funkcja obsługująca błędy związane z geolokalizacją
function handleLocationError(browserHasGeolocation, pos) {
  var infoWindow = new google.maps.InfoWindow();
  infoWindow.setPosition(pos);
  infoWindow.setContent(browserHasGeolocation ?
                        'Błąd: Nie można uzyskać dostępu do Twojej lokalizacji.' :
                        'Błąd: Twoja przeglądarka nie obsługuje geolokalizacji.');
  infoWindow.open(map);
}

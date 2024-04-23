// Klasa reprezentująca produkt
class Produkt {
    // Konstruktor klasy Produkt
    constructor(productName, ingredients, price, count) {
        this.productName = productName;
        this.ingredients = ingredients;
        this.price = price;
        this.count = count;
    }
}

// Klasa reprezentująca dane użytkownika
class Dane {
    constructor(name, surrname, email, city, ulica, code, phone, apartment, comment, paymentMethod, houseNumber) {
        this.name = name;
        this.surrname = surrname;
        this.email = email;
        this.city = city;
        this.ulica = ulica;
        this.code = code;
        this.phone = phone;
        this.apartment = apartment;
        this.comment = comment;
        this.paymentMethod = paymentMethod;
        this.houseNumber = houseNumber;
    }
}

// Funkcja dodająca produkt do koszyka
function addProduct(productName, ingredients, price) {
    //Każda jakakolwiek operacja w koszyku usuwa informacje o gotowym juz zamowieniu i wymusza ponowne potwierdzenie danych.
    let informacjeDiv = document.getElementById('info');
    informacjeDiv.innerHTML = ''; //usunięcie informacji o zamówieniu
    let produkt = new Produkt(productName, ingredients, price, 1); // Tworzenie nowego produktu
    let cart = JSON.parse(localStorage.getItem('cart')); // Pobranie koszyka z localStorage
    if (cart === null) cart = []; // Jeśli koszyk jest pusty, utwórz nową tablicę
    let isExistCart = false;
    //Jeśli istnieje produkt zwiększamy jego ilość
    for (const item of cart) {
        if (item.productName === productName) {
            item.count++;
            isExistCart = true;
        }
    }

    //Jeśli nie istnieje produkt dodajemy go
    if (!isExistCart) cart.push(produkt);
    localStorage.setItem('cart', JSON.stringify(cart)); // Zapisanie koszyka do localStorage
    showCart(); // Płynne odświeżanie koszyka po dodaniu pizzy
}


//Funkcja czyszcząca koszyk
function clearCart() {
    localStorage.removeItem('cart'); // Usunięcie koszyka z localStorage
    let informacjeDiv = document.getElementById('info');
    informacjeDiv.innerHTML = ''; //usunięcie informacji o zamówieniu
    showCart();
}

function showCart() {
    let cartHTML = document.getElementById('koszyk'); // Pobranie elementu #koszyk
    let cart = JSON.parse(localStorage.getItem('cart'));
    let informacjeDiv = document.getElementById('info');
    //Koszyk pusty to czyścimy zawartość koszyka i nie wyświetlamy nic
    if (cart == null || cart.length === 0) {
        cart = [];
        informacjeDiv.innerHTML = ''; //usunięcie informacji o zamówieniu jesli koszyk jest pusty
        cartHTML.innerHTML = '<h3>Koszyk jest pusty</h3>';
    }

    //Jeśli koszyk nie jest pusty to wyświetlamy zawartość
    else {
        let cartContent = ''; // Czyszczenie koszyka
        //Zawartość koszyka załadowywana od początku za każdym wywołaniem funkcji showCart()
        cartContent += `
                        <table class="table table-bordered"> <!-- Tabela z obramowaniem -->
                        <thead>
                            <tr>
                                <th>Nazwa produktu</th>
                                <th>Cena (zł)</th>
                                <th>Ilość</th>
                                <th>Suma (zł)</th>
                                <th>Usuń</th>
                            </tr>
                        </thead>
                        <tbody> <!-- Wyświetlenie produktów w koszyku -->
                            ${cart.map(produkt => ` <!-- Mapowanie produktów w koszyku -->
                                <tr> <!-- Wyświetlenie nazwy produktu, ceny, ilości i sumy -->
                                    <td>${produkt.productName}</td>
                                    <td>${produkt.price} zł</td>
                                    <td>${produkt.count}</td>      
                                    <td>${produkt.price * produkt.count} zł</td>
                                    <td><button class="btn btn-danger" onclick="removeProduct('${produkt.productName}')">Usuń</button></td> <!-- Przycisk usuwający produkt z koszyka -->
                                </tr>
                            `).join('')} <!-- Połączenie produktów w koszyku, join łączy produkty w koszyku -->
                        </tbody>
                    </table>
                    <p class="suma"> <!-- Wyświetlenie sumy koszyka -->
                    <strong>Suma:</strong></td>   
                    ${cart.reduce((acc, produkt) => acc + (produkt.price * produkt.count), 0)} zł </p>
                    `;
        cartHTML.innerHTML = cartContent; //wyświetlenie koszyka
    }
}

function removeProduct(productName) {
    let cart = JSON.parse(localStorage.getItem('cart')); // Pobranie koszyka z localStorage
    let newCart = cart.filter(produkt => produkt.productName !== productName); // Usunięcie produktu z koszyka
    localStorage.setItem('cart', JSON.stringify(newCart)); // Zapisanie koszyka do localStorage
    let informacjeDiv = document.getElementById('info');
    informacjeDiv.innerHTML = ''; //usunięcie informacji o zamówieniu
    showCart();// Płynne odświeżanie koszyka po usunięciu produktu
}

/*Początek walidacji danych z formularza*/
//Walidacja imienia
function validateName(name) {
    let namePattern = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,40}$/; //Imię musi składać się z liter i mieć długość od 2 do 40 znaków
    if (!namePattern.test(name)) { //Funkcja testująca RegExp na podanym stringu
        document.getElementById("nameError").innerHTML = "Proszę wprowadzić poprawne imię."; //Komunikat o błędnym imieniu
        return false; //Zwraca false jeżeli imię jest niepoprawne
    }
    else {
        document.getElementById("nameError").innerHTML = ""; //usuniecie komunikatu o bledzie
        return true;
    }
}
//Następne walidacje są anagoliczne do powyższej
//Walidacja nazwiska
function validateSurrname(surrname) {
    let surrnamePattern = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ]{2,40}$/; //Nazwisko musi składać się z liter i mieć długość od 2 do 40 znaków
    if (!surrnamePattern.test(surrname)) {
        document.getElementById("surrnameError").innerHTML = "Proszę wprowadzić poprawne nazwisko.";
        return false;
    }
    else {
        document.getElementById("surrnameError").innerHTML = "";
        return true;
    }

}
//Walidacja ulicy
function validateStreet(street) {
    let streetPattern = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]{2,90}$/; //Ulica musi składać się z liter i mieć długość od 2 do 90 znaków
    if (!streetPattern.test(street)) {
        document.getElementById("streetError").innerHTML = "Proszę wprowadzić poprawną ulicę.";
        return false;
    }
    else {
        document.getElementById("streetError").innerHTML = "";
        return true;

    }
}
//Walidacja numeru domu
function validateNumber(number) {
    let numberPattern = /^[0-9]{1,5}$/; //Numer domu musi składać się z cyfr i mieć długość od 1 do 5 znaków
    if (!numberPattern.test(number)) {
        document.getElementById("numberError").innerHTML = "Proszę wprowadzić poprawny numer.";
        return false;
    }
    else {
        document.getElementById("numberError").innerHTML = "";
        return true;
    }
}
//Walidacja miasta
function validateCity(city) {
    let cityPattern = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]{2,50}$/; //Miasto musi składać się z liter i mieć długość od 2 do 50 znaków
    if (!cityPattern.test(city)) {
        document.getElementById("cityError").innerHTML = "Proszę wprowadzić poprawne miasto.";
        return false;
    }
    else {
        document.getElementById("cityError").innerHTML = "";
        return true;
    }
}
//Walidacja numeru mieszkania
function validateApartment(apartment) {
    let apartmentPattern = /^[0-9]*$/; //Numer mieszkania musi składać się z cyfr
    if (!apartmentPattern.test(apartment)) {
        document.getElementById("apartmentError").innerHTML = "Proszę wprowadzić poprawny numer mieszkania.";
        return false;
    }
    else {
        document.getElementById("apartmentError").innerHTML = "";
        return true;
    }
}


//Walidacja adresu email
function validateEmail(email) {
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; //Email musi składać się z liter, cyfr i @ na koniec .domena np krokiet@wp.pl
    if (!emailPattern.test(email)) {
        document.getElementById("emailError").innerHTML = "Proszę wprowadzić poprawny adres email.";
        return false;
    }
    else {
        document.getElementById("emailError").innerHTML = "";
        return true;
    }
}
//Walidacja numeru telefonu
function validatePhone(phone) {
    let phonePattern = /^[0-9]{3} [0-9]{3} [0-9]{3}$/; //Numer telefonu musi składać się z cyfr i mieć format 123 456 789
    if (!phonePattern.test(phone)) {
        document.getElementById("phoneError").innerHTML = "Proszę wprowadzić poprawny numer telefonu.";
        return false;
    }
    else {
        document.getElementById("phoneError").innerHTML = "";
        return true;
    }

}
//Walidaacja kodu pocztowego
function validateCode() {
    let codePattern = /^[0-9]{2}-[0-9]{3}$/; //Kod pocztowy musi składać się z cyfr i mieć format 12-345
    let code = document.getElementById('code').value;
    if (!codePattern.test(code)) {
        document.getElementById("codeError").innerHTML = "Proszę wprowadzić poprawny kod pocztowy.";
        return false;
    }
    else {
        document.getElementById("codeError").innerHTML = "";
        return true;
    }
}


//Funkcja walidująca wszystkie pola formularza
function validateFormData() {
    /*Pobranie wartości z pól formularza */
    let name = document.getElementById('name').value.trim(); //Pobranie wartości z pola imię, trim() usuwa białe znaki z początku i końca stringa
    let surrname = document.getElementById('surrname').value.trim();
    let email = document.getElementById('email').value.trim();
    let city = document.getElementById('city').value.trim();
    let number = document.getElementById('number').value.trim();
    let street = document.getElementById('street').value.trim();
    let code = document.getElementById('code').value.trim();
    let phone = document.getElementById('phone').value.trim();
    let apartment = document.getElementById('apartment').value.trim();
    let comment = document.getElementById('comment').value.trim();
    let paymentMethod = document.getElementById('payment-method').value; //Pobranie wartości z pola metoda płatności


    /*Walidacja pól formularza, wywołanie do tego odpowiednich funkcji*/
    validateName(name);
    validateSurrname(surrname);
    validateStreet(street);
    validateNumber(number);
    validateCity(city);
    validateApartment(apartment);
    validateEmail(email);
    validatePhone(phone);
    validateCode(code);

    /*Walidacja uwag do zamówienia */
    if (comment.length > 500 || comment.length < 0) { //uwaga do zamowienia moze miec max 500znakow
        ok = false;
        document.getElementById("commentError").innerHTML = 'Proszę wprowadzić poprawny comment.'; //komentarz jesli za dlugi
        return false;
    }
    else {
        document.getElementById("commentError").innerHTML = ""; //usuniecie komunikatu o bledzie
    }

    //Sprawdzenie czy wszsytkie pola są wypełnione poprawnie
    if (validateName(name) && validateSurrname(surrname) && validateStreet(street) && validateNumber(number) && validateCity(city) && validateApartment(apartment) && validateEmail(email) && validatePhone(phone) && validateCode(code)) {

        /*Wartość  pól opcjonalnych w przypadku nie podania żadnych wartości*/
        if (comment === '') comment = 'Brak komentarza';
        if (apartment === '') apartment = 'Brak numeru mieszkania';

        /*Sprawdzenie czy wszystkie pola są wypełnione poprawnie */
        if (name === '' || surrname === '' || email === '' || city === '' || number === '' || street === '' || code === '' || phone === '' || paymentMethod === '') {
            return false;
        }
        else {
            let dane = new Dane(name, surrname, email, city, street, code, phone, apartment, comment, paymentMethod, number);
            /*Zapisanie danych do local storage */
            localStorage.setItem('dane', JSON.stringify(dane)); //JSON.stringify zamienia obiekt na string
            return true; // zwróc true jeżeli wszystkie pola są dobrze wypełnione
        }
    }
}
/*Koniec walidacji danych z formularza*/

/*Przy wybraniu płatności kartą mamy możliwość wypełnienia danych dotyczących karty*/
function platnoscKarta() {
    let informacjeDiv = document.getElementById('info');
    informacjeDiv.innerHTML = ''; //usunięcie informacji o zamówieniu
    let paymentOption = document.getElementById('payment-method').value; //sprawdzamy jaka metoda płatności została wybrana
    let htmlFieldPaymentCard = document.getElementById('payment-card'); //pobieramy div w którym będziemy wyświetlać pola do wprowadzenia danych karty
    let htmlPayment = ''; //zmienna przechowująca html do wyświetlenia
    if (paymentOption === 'creditCard') {
        //Formularz służący do wprowadzania danych karty płatniczej  (numer karty, data ważności, kod CVV)
        htmlPayment =
            `
         <div class="container">
         <form>
             <div class="row mb-3">
                 <div class="col">
                     <label for="visaRadio">Karta:</label>
                     <div class="form-check">
                         <input class="form-check-input" type="radio" name="karta" value="visa" id="visaRadio" required title="Rodzaj karty płatniczej." checked>
                         <label class="form-check-label" for="visaRadio">Visa</label>
                     </div>
                     <div class="form-check">
                         <input class="form-check-input" type="radio" name="karta" value="master card" id="mcRadio" required title="Rodzaj karty płatniczej.">
                         <label class="form-check-label" for="mcRadio">Master Card</label>
                     </div>
                 </div>
                 <div class="col">
                     <label for="numerKarty">Numer karty:</label>
                     <input type="text" class="form-control" name="numerKarty" id="numerKarty" required placeholder="1234 5678 9101 1121">
                     <div id="numerKartyError" class="error"></div>
                 </div>
             </div>
             <div class="row mb-3">
                 <div class="col">
                     <label for="dataWaznosci">Data ważności:</label>
                     <input type="month" class="form-control" name="dataWaznosci" id="dataWaznosci" required title="Data ważności karty płatniczej.">
                 </div>
                 <div class="col">
                     <label for="cvv">Kod CVV:</label>
                     <input type="text" class="form-control" name="cvv" id="cvv" placeholder="123" required title="Kod CVV z odwrotu twojej karty płatniczej."> <!--Placeholder podaje przykładowy kod CVV-->
                        <div id="cvvError" class="error"></div>
                 </div>
             </div>
         </form>
     </div>
     
        `;
        htmlFieldPaymentCard.innerHTML = htmlPayment;  //wyświetlenie inputów do wprowadzenia danych karty


        document.getElementById('numerKarty').addEventListener('input', formatCardNumberInput); //event listener formatujący numer karty przy wprowadzaniu
        document.getElementById('cvv').addEventListener('input', formatCvvInput); //event listener formatujący kod CVV przy wprowadzaniu
    }
    else {
        htmlFieldPaymentCard.innerHTML = ''; //usunięcie inputów do wprowadzenia danych karty
    }
}




/*Funkcja zajmująca się walidacją numeru karty pozwala wprowadzić dane tylko w foramcie 1234 5678 9101 1121 */
function formatCardNumberInput() {
    let cardNumber = document.querySelector('#numerKarty');
    let inputValue = cardNumber.value.replace(/\D/g, ""); // Usuwa znaki które nie są cyframi
    let formattedValue = "";

    if (inputValue.length > 0) {
        formattedValue += inputValue.slice(0, 4); // Dodaje pierwsze 4 cyfry
    }
    if (inputValue.length > 4) {
        formattedValue += " " + inputValue.slice(4, 8); // tak jak poprzednio
    }
    if (inputValue.length > 8) {
        formattedValue += " " + inputValue.slice(8, 12);  // tak jak poprzednio
    }
    if (inputValue.length > 12) {
        formattedValue += " " + inputValue.slice(12, 16); // Dodaje spację i kolejne 4 cyfry

    }

    cardNumber.value = formattedValue; //przypisanie sformatowanego kodu do inputa

}

/*Funkcja zajmująca się walidacją kodu cvv pozwala wprowadzić dane tylko w foramcie 123 */
function formatCvvInput() {
    let cvv = document.querySelector('#cvv');
    let inputValue = cvv.value.replace(/\D/g, ""); // Usuwa znaki które nie są cyframi
    let formattedValue = ""; // zmienna do przechowywania numeru po formatowaniu, początkowo pusta

    if (inputValue.length > 0) {
        formattedValue += inputValue.slice(0, 3); //pozwala na utworzenie tylko 3 cyfrowego kodu cvv, jezeli wiecej niz 3 znaki to nie da sie wprowadzic

    }

    cvv.value = formattedValue; //przypisanie sformatowanego kodu do inputa
}

/*Funkcja zajmująca się walidacją numeru telefonu pozwala wprowadzić dane tylko w foramcie 123 456 789, dodatkowo przy podaniu złych wartości zwraca komunikat do użytkownika */
function formatPhoneNumber() {
    let phoneNumber = document.querySelector('#phone'); //pobranie numeru telefonu
    let inputValue = phoneNumber.value.replace(/\D/g, ""); // Usuwa znaki które nie są cyframi
    let formattedValue = ""; // zmienna do przechowywania numeru po formatowaniu, początkowo pusta

    //formatowanie numeru telefonu w formacie 123 456 789
    if (inputValue.length > 0) {
        formattedValue += inputValue.slice(0, 3);
    }
    if (inputValue.length > 3) {
        formattedValue += " " + inputValue.slice(3, 6);
    }
    if (inputValue.length > 6) {
        formattedValue += " " + inputValue.slice(6, 9);
    }

    phoneNumber.value = formattedValue; //przypisanie sformatowanego numeru do inputa
}

/*Funkcja zajmująca się walidacją kodu pocztowego pozwala wprowadzić dane tylko w foramcie 12-345 */
function formatCodeInput() {
    let codeNumber = document.querySelector('#code');
    let inputValue = codeNumber.value.replace(/\D/g, ""); // Usuwa znaki które nie są cyframi
    let formattedValue = "";
    if (inputValue.length > 0) {
        formattedValue += inputValue.slice(0, 2); // Dodaje pierwsze 2 cyfry
    }
    if (inputValue.length > 2) {
        formattedValue += "-" + inputValue.slice(2, 5); // Dodaje myślnik i kolejne 3 cyfry

    }
    codeNumber.value = formattedValue; //przypisanie sformatowanego kodu do inputa

}

/*Obsługa addEventListener działa gdy użytkownik kliknie na pole input do walidacji*/
window.addEventListener('DOMContentLoaded', event => {
    document.getElementById('phone').addEventListener('input', formatPhoneNumber); //dodanie event listenera do pola telefonu
    document.getElementById('code').addEventListener('input', formatCodeInput); //dodanie event listenera do pola kodu pocztowego
    document.getElementById('payment-method').addEventListener('change', platnoscKarta); //event listener ktory generuje funkcję platnoscKarta (wyswietli przy wybraiu karty inputy do wprowadzenia danych)
});



function createOrderHTML() {
    let dane = JSON.parse(localStorage.getItem('dane')); //Pobranie danych z localStorage
    let koszyk = JSON.parse(localStorage.getItem('cart')); //Pobranie koszyka z localStorage
    let informacjeDiv = document.getElementById('info'); //Pobranie diva w którym będziemy wyświetlać informacje o zamówieniu
    informacjeDiv.innerHTML = ''; //Wyczyszczenie diva z informacjami
    /*Dodaj informacje o koszyku zakupowym*/
    if (koszyk !== null && koszyk.length > 0) {
        let koszykHTML = ``;

        //Informacje o zakupionych produktach w formie tabeli
        koszykHTML += `
            <div class="row">
            <div class="col">
                <h2>Koszyk zakupów:</h2>
                <table class="table table-bordered"> <!-- Tabela z obramowaniem -->
                    <thead>
                        <tr>
                            <th>Nazwa produktu</th>
                            <th>Cena (zł)</th>
                            <th>Ilość</th>
                            <th>Suma (zł)</th>
                        </tr>
                    </thead>
                    <tbody> <!-- Wyświetlenie produktów w koszyku -->
                        ${koszyk.map(produkt => ` <!-- Mapowanie produktów w koszyku -->
                            <tr> <!-- Wyświetlenie nazwy produktu, ceny, ilości i sumy -->
                                <td>${produkt.productName}</td>
                                <td>${produkt.price} zł</td>
                                <td>${produkt.count}</td>
                                <td>${produkt.price * produkt.count} zł</td>
                            </tr>
                        `).join('')} <!-- Połączenie produktów w koszyku, join łączy produkty w koszyku -->
                        <tr>
                            <td colspan="3" class="text-right"><strong>Suma:</strong></td>
                            <!-- Obliczenie sumy koszyka -->
                            <td class="fw-bold">${koszyk.reduce((acc, produkt) => acc + (produkt.price * produkt.count), 0)} zł</td>   <!--klasa fw-bold dodaje pogrubienie -->
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        `;
        informacjeDiv.innerHTML += koszykHTML; //Dodanie informacji o koszyku do diva
    } else {
        window.alert("Koszyk jest pusty");
        return false;
    }
    // Dodaj dane osobowe do HTML
    let daneHTML = `
    <div class="page-section>
    <div class="container">
    <div class="row">
        <div class="col">
            <h2>Dane do wysyłki:</h2>
            <table class="table table-bordered">
                <tbody>
                    <tr>
                        <th>Imię</th>
                        <td>${dane.name}</td> <!-- Wyświetlenie imienia-->
                    </tr>
                    <tr>
                        <th>Nazwisko</th>
                        <td>${dane.surrname}</td> <!-- Wyświetlenie nazwiska-->
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>${dane.email}</td>  <!-- Wyświetlenie emaila-->
                    </tr>
                    <tr>
                        <th>Miasto</th>
                        <td>${dane.city}</td> <!-- itd..-->
                    </tr>
                    <tr>
                        <th>Ulica</th>
                        <td>${dane.ulica}</td>
                    </tr>
                    <tr>
                        <th>Kod pocztowy</th>
                        <td>${dane.code}</td>
                    </tr>
                    <tr>
                        <th>Numer telefonu</th>
                        <td>${dane.phone}</td>
                    </tr>
                    <tr>
                        <th>Numer mieszkania</th>
                        <td>${dane.apartment === '' ? "Brak numeru mieszkania" : dane.apartment}</td>
                    </tr>
                    <tr>
                        <th>Komentarz</th>
                        <td>${dane.comment === '' ? "Brak komentarza" : dane.comment}</td>
                    </tr>
                    <tr>
                        <th>Metoda płatności</th>
                        <td>${dane.paymentMethod}</td>
                    </tr>
                </tbody>
            </table>
    </div>
`;
    informacjeDiv.innerHTML += daneHTML;
}


//Walidacja danych karty kredytowej
function validCreditCardData() {
    let cardNumber = document.getElementById('numerKarty').value.trim(); //Pobranie numeru karty trim() usuwa białe znaki z początku i końca stringa
    let cvv = document.getElementById('cvv').value.trim();
    let cardNumberPattern = /^\d{4} \d{4} \d{4} \d{4}$/; //Numer karty musi składać się z 16 cyfr
    let cvvPattern = /^[0-9]{3}$/; //Kod CVV musi składać się z 3 cyfr
    let dateValue = document.getElementById('dataWaznosci').value; //Pobranie wartości z pola data ważności karty

    if (!cardNumberPattern.test(cardNumber)) {
        document.getElementById('numerKarty').style.borderColor = 'red'; //Jeżeli numer karty jest niepoprawny to obramowanie inputa zmienia kolor na czerwony
        return false;
    }
    else {
        document.getElementById('numerKarty').style.borderColor = 'green'; //Jeżeli numer karty jest poprawny to obramowanie inputa zmienia kolor na zielony
    }

    if (!cvvPattern.test(cvv)) {
        document.getElementById('cvv').style.borderColor = 'red';
        return false;
    }
    else {
        document.getElementById('cvv').style.borderColor = 'green';
    }

    if (!dateValue) {
        document.getElementById('dataWaznosci').style.borderColor = 'red';
        return false;
    }
    else {
        document.getElementById('dataWaznosci').style.borderColor = 'green';

    }
    return true;
}
// funkcja order to funkcja która wywołuje wszystkie walidacje, jest pod przyciskiem przejdź dalej
function order() {
    let informacjeDiv = document.getElementById('info');
    informacjeDiv.innerHTML = ''; //usunięcie informacji o zamówieniu
    if (document.getElementById('payment-method').value === 'creditCard') { //Jeżeli wybrano płatność kartą
        if (validateFormData() && validCreditCardData()) { //jezeli dane podane są poprawne i dane karty są poprawne
            createOrderHTML(); //wywołanie funkcji tworzącej HTML z zamówieniem
        }
        else {
            informacjeDiv.innerHTML = ''; //usunięcie informacji o zamówieniu
            return false;
        }
    }

    else {
        if (validateFormData()) {
            createOrderHTML();
        }
        else {
            informacjeDiv.innerHTML = '';
            return false;
        }
    }
}

//Skrypt z Fetch API, który pobiera pliki tekstowe z serwera i wyświetla je w elemencie s1
document.addEventListener("DOMContentLoaded", function () {
    //Wyswietlenie powiadomienia dla użytkownika o konieczności serwera Apache
    window.alert("Ta strona wymaga serwera Apache, aby działać poprawnie. W przeciwnym wypadku niektóre funkcje mogą nie działać.");
    var but1 = document.getElementById("b1");
    //dodanie nasłuchiwania na zdarzenie kliknięcia dla przycisku but1
    but1.addEventListener('click', function () {
        //pobranie pliku info.txt z serwera
        fetch("http://localhost/Projekt2/ajaxData/info.txt") //pobranie pliku info.txt z serwera
            .then(response => { return response.text(); }) //zwrócenie odpowiedzi w formie tekstu
            .then(dane => { document.getElementById("s1").innerHTML = dane; }) //wyświetlenie pobranych danych w elemencie s1
    },
        false);

    //identycznie jak poprzednio
    var but2 = document.getElementById("b2");
    but2.addEventListener('click', function () {
        fetch("http://localhost/Projekt2/ajaxData/act.txt")
            .then(response => { return response.text(); })
            .then(dane => { document.getElementById("s1").innerHTML = dane; })
    },
        false);
    //identycznie jak poprzednio
    var but3 = document.getElementById("b3");
    but3.addEventListener('click', function () {
        fetch("http://localhost/Projekt2/ajaxData/gal.txt")
            .then(response => { return response.text(); })
            .then(dane => { document.getElementById("s1").innerHTML = dane; })
    },
        false);

    //identycznie jak poprzednio
    var but4 = document.getElementById("b4");
    but4.addEventListener('click', function () {
        fetch("http://localhost/Projekt2/ajaxData/form.txt")
            .then(response => { return response.text(); })
            .then(dane => { document.getElementById("s1").innerHTML = dane; })
    },
        false);
})


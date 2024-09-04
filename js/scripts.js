let guestsData = [];

document.addEventListener('DOMContentLoaded', function() {
    // Contador de días
    const eventDate = new Date('2024-09-21'); // Cambia la fecha al día del evento
    const today = new Date();
    const timeDiff = eventDate - today;
    const daysLeft = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
    document.getElementById('daysLeft').textContent = daysLeft;

    // Cargar datos de invitados
    fetch('data/guests.json')
        .then(response => response.json())
        .then(data => {
            guestsData = data;
        });

    InitMap();    
});

function checkEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        checkGuest();
    }
}

function checkGuest() {
    const nameInput = document.getElementById('name').value.trim();
    const guestInfo = document.getElementById('guestInfo');
    const confirmButton = document.getElementById('confirmButton');

    const guest = guestsData.find(g => g.name.toLowerCase() === nameInput.toLowerCase());
    
    if (guest) {
        guestInfo.textContent = `Número de personas: ${guest.guests}`;
        confirmButton.disabled = false;
    } else {
        guestInfo.textContent = 'Nombre no encontrado';
        confirmButton.disabled = true;
    }
}

document.addEventListener("DOMContentLoaded", function() {
    // Fecha del evento (Ajusta esto a la fecha real del evento)
    const eventDate = new Date('2024-09-21T22:00:00').getTime();

    // Actualiza el reloj cada segundo
    const countdown = setInterval(function() {
        // Fecha y hora actual
        const now = new Date().getTime();

        // Calcula la diferencia de tiempo entre la fecha del evento y la fecha actual
        const timeLeft = eventDate - now;

        // Cálculos de tiempo para días, horas, minutos y segundos
        const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

        // Muestra el resultado en los elementos correspondientes
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours;
        document.getElementById("minutes").innerText = minutes;
        document.getElementById("seconds").innerText = seconds;

        // Si el contador llega a cero, muestra un mensaje
        if (timeLeft < 0) {
            clearInterval(countdown);
            document.getElementById("countdown-timer").innerText = "¡La fiesta ha comenzado!";
        }
    }, 1000);
});

function capitalizeInput(input) {
    let words = input.value.split(' ');
    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            words[i] = words[i][0].toUpperCase() + words[i].substring(1).toLowerCase();
        }
    }
    input.value = words.join(' ');
}

let slideIndex = 0;
showSlides(slideIndex);

function plusSlides(n) {
    showSlides(slideIndex += n);
}


function showSlides(n) {
    let slides = document.querySelectorAll('.carousel .slide');
    if (n >= slides.length) { slideIndex = 0 }
    if (n < 0) { slideIndex = slides.length - 1 }
    let newTransformValue = -slideIndex * 100 / slides.length;
    document.querySelector('.carousel-inner').style.transform = `translateX(${newTransformValue}%)`;
}

function sendWhatsAppMessage(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const guest = guestsData.find(g => g.name.toLowerCase() === name.toLowerCase());
    if (!guest) return;
    
    const message = `Hola, Soy ${name}, confirmo mi asistencia con ${guest.guests} persona(s).`;
    const phoneNumber = '+5493812129334'; // Cambia este número al número de teléfono de destino
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
}

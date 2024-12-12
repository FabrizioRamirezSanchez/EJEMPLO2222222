// Clase para el Preloader
class Preloader {
  static show(duration) {
      setTimeout(() => {
          document.body.classList.add('loaded'); // Agrega una clase para ocultar el preloader
          this.revealCards(); // Revela las tarjetas
      }, duration); // Duración en milisegundos
  }
  
  // Animación al cargar la página: aparecen las cards
  static revealCards() {
      const cards = document.querySelectorAll('.card'); // Selecciona todos los elementos que tienen la clase card
      cards.forEach((card, index) => { // Por cada tarjeta, se ejecuta la función
          setTimeout(() => { // Permite ejecutar el código después de un cierto período de tiempo
              card.classList.add('visible'); // Agrega la clase visible con un retraso
          }, index * 300); // Retraso en milisegundos por tarjeta
      });
  }
}

// Mostrar el preloader durante 3 segundos
Preloader.show(3000); 

// Botón volver arriba mejorado
class ScrollToTop {
  static init() {
      const btn = document.getElementById('backToTopBtn'); // Busca el botón en el documento
      
      // Verifica si el botón existe
      if (!btn) {
          console.error("El botón 'backToTopBtn' no se encontró en el documento.");
          return;   
      }

      // Muestra el botón cuando se hace scroll
      window.onscroll = () => {
          if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
              btn.classList.add('visible'); // Agrega la clase visible si se ha desplazado hacia abajo
          } else {
              btn.classList.remove('visible'); // Remueve la clase si se ha desplazado hacia arriba
          }
      };

      // Asigna el evento click al botón para volver al inicio
      btn.addEventListener('click', scrollToTop);
  }
}

// Función para scroll suave
function scrollToTop() {
  window.scrollTo({
      top: 0, // Desplazarse hacia la parte superior de la página
      behavior: 'smooth' // Transición suave
  });
}

// Llamada a la inicialización del botón al cargar el contenido
document.addEventListener('DOMContentLoaded', () => {
  ScrollToTop.init(); // Inicializa la funcionalidad del botón volver arriba
});



// Animación del conteo
function animateCount(element, endValue, duration) {
  let startValue = 0;
  let startTime = null;  /*almacena*/

  const step = (timestamp) => { /*Esta línea se ejecuta 1*/
      if (!startTime) {
          startTime = timestamp;
      }
      const progress = Math.min((timestamp - startTime) / duration, 1); /*progreso*/
      const currentValue = Math.round(startValue + (endValue - startValue) * progress); /* Calcula el valor actual.*/
      element.textContent = currentValue + " soles";

      if (progress < 1) {   /*ha terminado*/
          requestAnimationFrame(step); /*llamada */
      }
  };

  requestAnimationFrame(step); /* mantiene la animación*/
}

// Obtener el elemento donde mostraremos el número
const countElement = document.getElementById('contadorfondos');

// Obtener el contador actual desde localStorage
let contadorFondos = localStorage.getItem('contadorfondos');

// Si no existe, inicializar en 0
if (!contadorFondos) {
  contadorFondos = 0;
} else {
  // Si ya existe, convertirlo a número
  contadorFondos = parseInt(contadorFondos);
}

// Guardar el nuevo valor (incrementado) en localStorage
contadorFondos++; // Corrige la variable a "contadorFondos"
localStorage.setItem('contadorfondos', contadorFondos);

// Animar el contador desde 0 hasta el valor actual + 1
animateCount(countElement, contadorFondos + 1, 3000);


//lINEA azul segun te desplazas
window.addEventListener("scroll", function () {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop; /*posicion*/
    let docHeight = document.documentElement.scrollHeight - window.innerHeight; /*altura */
    let scrollPercent = (scrollTop / docHeight) * 100;

    let scrollLine = document.getElementById("scroll-line");
    scrollLine.style.width = scrollPercent + "%"; /* Establece el ancho*/
});


//Usuario

//TEXTO CARRUCEL

let currentSlide = 0; /* declara una variable llamada*/

function changeSlide(direction) { /* define una función*/
  const carouselContainer = document.querySelector('.carousel-container'); /*contenedor */
  const totalSlides = document.querySelectorAll('.carousel-item').length; /*cuenta diapo*/
  currentSlide = (currentSlide + direction + totalSlides) % totalSlides; /* Sumamos el valor*/
  carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`; 
}

//Tarjeta volteable

function flipCard(card1) {
  const cardInner = card1.querySelector('.card-inner');
  cardInner.classList.toggle('flipped');  
}

// Escucha de clic para volver a la posición original cuando se haga clic fuera de las cartas
document.addEventListener('click', function (event) {   /*click*/
  const clickedCard = event.target.closest('.card1');  /*elemento exacto*/
  document.querySelectorAll('.card-inner').forEach(cardInner => {   /*busca */
    if (cardInner !== clickedCard?.querySelector('.card-inner')) { 
      cardInner.classList.remove('flipped');  /*devolviér a su posición original.*/
    }
  });
});

/* BOTON VER MAS*/

function toggleExpandable() {
  var expandableContent = document.getElementById("expandableContent");
  if (expandableContent.style.display === "block") {        
    expandableContent.style.display = "none";  /*Si la condición es verdadera*/
    document.querySelector('.toggle-btn').innerText = 'Ver más';
  } else {
    expandableContent.style.display = "block";   /*Si la condición es falsa */
    document.querySelector('.toggle-btn').innerText = 'Ver menos';
  }
}

// Clase para el Preloader
class Preloader {
    static show(duration) {
        setTimeout(() => {
            document.body.classList.add('loaded'); // Agrega una  clase para ocultar el preloader
        }, duration); // Duracion en milisegundos
    }
}
// Llamamos al metodo esttaico para mostrar el preloader durante 2 segundos
Preloader.show(3000);


window.onscroll = function() {
    var btn = document.getElementById('backToTopBtn');
    if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
        btn.style.display = 'block';
    } else {
        btn.style.display = 'none';
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
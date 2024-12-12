class Preloader {
    static show(duration) {
        // Ocultar el preloader después de la duración especificada
        setTimeout(() => {
            document.body.classList.add('loaded'); // Agrega la clase para ocultar el preloader
        }, duration); // Duración en milisegundos (30500 ms = 30.5 segundos)
    }
}

// Mostrar el preloader durante un máximo de 30.5 segundos
Preloader.show(3000); // Cambiado a 30500 ms para coincidir con la duración de la animación

// Escuchar cuando toda la página esté completamente cargada
window.addEventListener('load', () => {
    // No es necesario agregar la clase aquí, ya lo hacemos en setTimeout
});

async function getEventos() {
    try {
        const response = await fetch('/api/eventos'); // Ruta del backend
        if (!response.ok) throw new Error('Error al obtener los eventos');
        const { hoy } = await response.json();

        // Seleccionar elementos del DOM
        const eventoHoy = document.getElementById('eventoHoyMensaje');
        const eventoHoySection = document.getElementById('eventoHoy');

        if (hoy.length > 0) {
            // Mostrar el evento de hoy con animación
            const evento = hoy[0];
            eventoHoy.innerHTML = `
                🎉 ¡Hoy celebramos: <strong>${evento.nombre_evento}</strong>! 🎉 
                Relacionado con: ${evento.ods_relacionado}`;
            eventoHoySection.style.display = 'block';
            eventoHoySection.classList.add('celebracion');
        } else {
            // Mensaje si no hay eventos
            eventoHoy.innerText = 'Por el momento no hay fechas para celebrar.';
            eventoHoySection.style.display = 'block';
        }
    } catch (error) {
        console.error('Error al obtener los eventos:', error);
        document.getElementById('eventoHoyMensaje').innerText = 'Error al cargar los eventos.';
        document.getElementById('eventoHoy').style.display = 'block';
    }
}


// Ejecutar al cargar la página
window.addEventListener('DOMContentLoaded', function () {
    getEventos(); // Obtener los eventos
});
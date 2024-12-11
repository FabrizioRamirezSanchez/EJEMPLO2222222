class Preloader {
    static show(duration) {
        setTimeout(() => {
            document.body.classList.add('loaded'); // Agrega la clase para ocultar el preloader
        }, duration);
    }
}

// Mostrar el preloader durante un máximo de 3 segundos
Preloader.show(3000); 

// Botón volver arriba mejorado
class ScrollToTop {
    static init() {
        const btn = document.getElementById('backToTopBtn');
        
        if (!btn) {
            console.error("El botón 'backToTopBtn' no se encontró en el documento.");
            return;
        }

        window.onscroll = () => {
            if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
                btn.classList.add('visible');
            } else {
                btn.classList.remove('visible');
            }
        };

        // Asigna el evento click al botón
        btn.addEventListener('click', scrollToTop);
    }
}

// Función para scroll suave
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Contador animado para números de impacto
class NumberCounter {
    static animate() {
        const numbers = document.querySelectorAll('.impact-number');
        
        numbers.forEach(number => {
            const target = parseInt(number.getAttribute('data-count'));
            const duration = 2000; // 2 segundos
            const step = target / (duration / 16); // 60 FPS
            let current = 0;
            
            const updateNumber = () => {
                current += step;
                if (current < target) {
                    number.textContent = Math.round(current);
                    requestAnimationFrame(updateNumber);
                } else {
                    number.textContent = target;
                }
            };
            
            updateNumber();
        });
    }
}

// Inicialización de la funcionalidad cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    Preloader.show(3000);
    ScrollToTop.init();
    
    // Iniciar contadores cuando la sección está en vista
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                NumberCounter.animate();
                observer.unobserve(entry.target);
            }
        });
    });
    
    const impactSection = document.querySelector('.nuestro-impacto');
    if (impactSection) {
        observer.observe(impactSection);
    }
});

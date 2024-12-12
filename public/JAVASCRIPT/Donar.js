document.addEventListener("DOMContentLoaded", function () {
    const botonDonar = document.getElementById("botonDonar");
    const warnings = document.getElementById("warnings");

    botonDonar.addEventListener("click", function (event) {
        event.preventDefault();

        // Variables de entrada
        const nombre = document.getElementById("nombre").value.trim();
        const telefono = document.getElementById("telefono").value.trim();
        const email = document.getElementById("email").value.trim();
        const donacion = parseFloat(document.getElementById("donacion").value.trim());
        const aceptar = document.getElementById("aceptar").checked;

        // Inicializar mensajes de advertencia
        const mensajes = [];

        // Validaciones
        if (!/^[a-zA-Z\s]+$/.test(nombre)) {
            mensajes.push("Nombre inválido. Solo letras y espacios.");
        }

        if (!/^\d{9}$/.test(telefono)) {
            mensajes.push("Número de teléfono inválido. Debe contener 9 dígitos.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mensajes.push("Correo electrónico inválido.");
        }

        if (isNaN(donacion) || donacion <= 0) {
            mensajes.push("El monto de donación debe ser un número positivo.");
        }

        if (!aceptar) {
            mensajes.push("Debe aceptar las condiciones para continuar.");
        }

        // Mostrar mensajes de advertencia o éxito
        if (mensajes.length > 0) {
            warnings.innerHTML = mensajes.join("<br>");
            warnings.style.color = "red";
        } else {
            warnings.innerHTML = "¡La donación ha sido recibida! Muchas gracias.";
            warnings.style.color = "green";

            // Aquí puedes enviar los datos al servidor
            enviarFormulario({ nombre, telefono, email, donacion });
        }
    });

    /**
     * Función para enviar datos al servidor mediante fetch
     */
    function enviarFormulario(data) {
        fetch('/donar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Error al enviar los datos.");
                }
                return response.json(); // Cambiado a .json() para obtener la respuesta en formato JSON
            })
            .then((data) => {
                // Manejo de la respuesta JSON
                if (data.success) {
                    warnings.innerHTML = data.message;
                    warnings.style.color = "green";
                } else {
                    warnings.innerHTML = data.message;
                    warnings.style.color = "red";
                }
            })
            .catch((error) => {
                warnings.innerHTML = error.message;
                warnings.style.color = "red";
            });
    }
});

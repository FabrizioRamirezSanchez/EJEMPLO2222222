document.addEventListener('DOMContentLoaded', function() {
    const btnIniciarSesion = document.getElementById("btn__iniciar-sesion");
    const btnRegistrarse = document.getElementById("btn__registrarse");
    const formLogin = document.querySelector(".formulario__login");
    const formRegister = document.querySelector(".formulario__register");
    const contenedorLoginRegister = document.querySelector(".contenedor__login-register");
    const cajaTraseraLogin = document.querySelector(".caja__trasera-login");
    const cajaTraseraRegister = document.querySelector(".caja__trasera-register");

    btnIniciarSesion.addEventListener("click", iniciarSesion);
    btnRegistrarse.addEventListener("click", register);
    window.addEventListener("resize", anchoPage);

    formLogin.addEventListener('submit', handleLogin);
    formRegister.addEventListener('submit', handleRegister);

    function handleLogin(e) {
        e.preventDefault();
        const username = formLogin.querySelector('input[type="text"]').value;
        const password = formLogin.querySelector('input[type="password"]').value;
    
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Inicio de sesión exitoso');
                // Redirigir a la página principal (producto.html)
                window.location.href = '../HTML/producto.html';
            } else {
                alert('Error en el inicio de sesión: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en el inicio de sesión');
        });
    }

    function handleRegister(e) {
        e.preventDefault();
        const fullName = document.getElementById("fullName").value;
        const email = document.getElementById("email").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fullName, email, username, password }), // Verifica que estos valores no estén vacíos
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Registro exitoso');
                iniciarSesion(); // Si quieres hacer login automático después del registro
            } else {
                alert('Error en el registro: ' + data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Error en el registro: ' + error.message);
        });
    }

    function anchoPage() {
        if (window.innerWidth > 850) {
            cajaTraseraRegister.style.display = "block";
            cajaTraseraLogin.style.display = "block";
        } else {
            cajaTraseraRegister.style.display = "block";
            cajaTraseraRegister.style.opacity = "1";
            cajaTraseraLogin.style.display = "none";
            formLogin.style.display = "block";
            contenedorLoginRegister.style.left = "0px";
            formRegister.style.display = "none";
        }
    }

    function iniciarSesion() {
        if (window.innerWidth > 850) {
            formLogin.style.display = "block";
            contenedorLoginRegister.style.left = "10px";
            formRegister.style.display = "none";
            cajaTraseraRegister.style.opacity = "1";
            cajaTraseraLogin.style.opacity = "0";
        } else {
            formLogin.style.display = "block";
            contenedorLoginRegister.style.left = "0px";
            formRegister.style.display = "none";
            cajaTraseraRegister.style.display = "block";
            cajaTraseraLogin.style.display = "none";
        }
    }

    function register() {
        if (window.innerWidth > 850) {
            formRegister.style.display = "block";
            contenedorLoginRegister.style.left = "410px";
            formLogin.style.display = "none";
            cajaTraseraRegister.style.opacity = "0";
            cajaTraseraLogin.style.opacity = "1";
        } else {
            formRegister.style.display = "block";
            contenedorLoginRegister.style.left = "0px";
            formLogin.style.display = "none";
            cajaTraseraRegister.style.display = "none";
            cajaTraseraLogin.style.display = "block";
            cajaTraseraLogin.style.opacity = "1";
        }
    }

    anchoPage();
});

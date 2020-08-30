var usuario = function() {

    const correo = document.getElementById('inputEmail');
    const contrasenia = document.getElementById('inputPassword');
    const formulario = document.getElementById('formulario')
    const inicio = document.getElementById('inicio');
    const nombreUsuario = document.getElementById('nombre-usuario');
    const imgUsuario = document.getElementById('img-usuario');
    const profesion = document.getElementById('profesion');
    const loginFallido = document.getElementById('login-fallido');
    const registrarUsuario = document.querySelector('#logreg-forms #btn-signup');
    const atras = document.querySelector('#logreg-forms #cancel_signup');
    const olvideContrasena = document.querySelector('#logreg-forms #forgot_pswd');
    const cancelarOlvideContrasena = document.querySelector('#logreg-forms #cancel_reset');

    EventListeners();

    //event listener
    function EventListeners() {
        formulario.addEventListener('submit', InicioSesion);
        registrarUsuario.addEventListener('click', toggleSignUp);
        atras.addEventListener('click', toggleSignUp);
        olvideContrasena.addEventListener('click', toggleResetPswd);
        cancelarOlvideContrasena.addEventListener('click', toggleResetPswd);
    }


    function toggleResetPswd(e) {
        e.preventDefault();
        $('#logreg-forms .form-signin').toggle() // display:block or none
        $('#logreg-forms .form-reset').toggle() // display:block or none
    }

    function toggleSignUp(e) {
        e.preventDefault();
        $('#logreg-forms .form-signin').toggle(); // display:block or none
        $('#logreg-forms .form-signup').toggle(); // display:block or none
    }


    function InicioSesion(e) {
        e.preventDefault();
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
        xhr.open("POST", '/login', true);

        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() { // Call a function when the state changes.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {

                if (xhr.response.ok == true) {
                    console.log(xhr.response.token);
                    localStorage.setItem('token', xhr.response.token); // write

                    window.location.replace("http://localhost:3001/");
                } else {
                    loginFallido.style.display = "block";

                    setTimeout(() => {
                        loginFallido.style.display = "none";
                    }, 3000);
                }

            }
        }
        xhr.send(`email=${correo.value}&password=${contrasenia.value}`);
    }

    function CerrarSesion(newMessage) {
        message = newMessage;
    }


    return {
        //InicioSesion: InicioSesion,
        CerrarSesion: CerrarSesion
    }
}();
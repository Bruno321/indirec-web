import React, { useState } from "react";

import "./Login.css";

import logoIndereq from "../../Assets/icons/logo-Indereq.svg";
import imageMain from "../../Assets/img/image-main.png";
import eyeOff from "../../Assets/icons/eye-off.svg";
import eye from "../../Assets/icons/eye.svg";

const Login = () => {
    /* A hook that allows to change the state of the passwordShown variable to show the password. */
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => setPasswordShown(!passwordShown);
    
    /* A hook that allows to change the state of the eyeShown variable to change the eye icon. */
    const [eyeShown, setEyeShown] = useState(true);
    const toggleEye = () => setEyeShown(!eyeShown);

    /* This is the function that is triggered when the user clicks the Submit button. */
    const handleSubmit = (event) => {
        event.preventDefault();
        const email = document.getElementById('email').value
        const password = document.getElementById('password').value
        console.log(email, password);

        /* This is the code that allows the user to log in. If the email and password are correct, the
        user is redirected to the home page. If not, an alert is shown. */
        if (email == "admin@gmail.com" && password == 123) {
            window.location.href = '/';
            localStorage.email = email;
        }
        else {
            alert("El usuario y/o contraseña son incorrectos")
        }
    }


    return (
        <div className="login-container">
        <div className="left-side">
            <img 
                src={logoIndereq} 
                alt="Logo de INDEREQ" 
                className="logo" 
            />
            <img
                src={imageMain}
                alt="Imagen de bienvenida"
                className="image-main"
            />
        </div>

        <div className="right-side">
            <form onSubmit={handleSubmit} className="form">
                <h1>Bienvenido a INDEREQ</h1>
                <h2>Iniciar Sesión</h2>

                <label>Correo electrónico:</label>
                <input
                    type="email"
                    placeholder="usuario@email.com"
                    id="email"
                    className="form-input"
                    required
                />

                <label>Contraseña:</label>
                <div className="container-input-password">
                    <input
                        type={passwordShown ? "text" : "password"}
                        placeholder="********"
                        className="form-input input-password"
                        id="password"
                        required
                    />
                    <img 
                        src={eyeShown ? eyeOff : eye} 
                        onClick={() => {togglePassword(); toggleEye();}}
                        className="eye-icon" 
                    />
                </div>

                <input 
                    type="submit" 
                    value="Iniciar Sesión" 
                    className="btn-login" 
                />
            </form>
        </div>
    </div>
    );
};

export default Login;

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
            <form className="form">
                <h1>Bienvenido a INDEREQ</h1>
                <h2>Iniciar Sesión</h2>

                <label>Correo electrónico:</label>
                <input
                    type="email"
                    placeholder="usuario@email.com"
                    className="form-input"
                    required
                />

                <label>Contraseña:</label>
                <div className="container-input-password">
                    <input
                        type={passwordShown ? "text" : "password"}
                        placeholder="********"
                        className="form-input input-password"
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

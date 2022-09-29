import React, { useState,useContext } from "react";

import "./Login.css";

import logoIndereq from "../../Assets/icons/logo-Indereq.svg";
import imageMain from "../../Assets/img/image-main.png";
import eyeOff from "../../Assets/icons/eye-off.svg";
import eye from "../../Assets/icons/eye.svg";
import axios from "axios";
import { LoginContext } from "../../Context/LoginContext";
import Swal from "sweetalert2";

const Login = () => {
    const {iniciarSesion} = useContext(LoginContext)
    /* A hook that allows to change the state of the passwordShown variable to show the password. */
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => setPasswordShown(!passwordShown);
    
    /* A hook that allows to change the state of the eyeShown variable to change the eye icon. */
    const [eyeShown, setEyeShown] = useState(true);
    const toggleEye = () => setEyeShown(!eyeShown);

    const [loginData,setLoginData] = useState({
        password:"",
        email:""
    })
    /* This is the function that is triggered when the user clicks the Submit button. */
    const handleSubmit = (event) => {
        event.preventDefault();
        // iniciarSesion('tokenfalso')
        axios.post('http://localhost:3000/api/auth',{
            email:loginData.email,
            password:loginData.password
        })
        .then((response)=>{
            //token
            // console.log(response.data)
            iniciarSesion(response.data.token)
        })
        .catch((e)=>{
            // Alert datos incorrectos
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correo o contraseña incorrectos',
              })
            console.log(e)
        })
        
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
            <form onSubmit={(e)=>handleSubmit(e)} className="form">
                <h1>Bienvenido a INDEREQ</h1>
                <h2>Iniciar sesión</h2>

                <label>Correo electrónico:</label>
                <input
                    type="email"
                    placeholder="usuario@email.com"
                    id="email"
                    className="form-input"
                    value={loginData.email}
                    onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
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
                        value={loginData.password}
                        onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
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

import React, { useState, useContext } from "react";
import { LoginContext } from "../../Context/LoginContext";
import { login } from '../../Service/Api';
import Swal from "sweetalert2";
import imageMain from "../../Assets/img/image-main.png";
import eyeOff from "../../Assets/icons/eye-off.svg";
import eye from "../../Assets/icons/eye.svg";
import "./Login.css";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const Login = () => {
    const {iniciarSesion} = useContext(LoginContext)
    /* A hook that allows to change the state of the passwordShown variable to show the password. */
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => setPasswordShown(!passwordShown);
    
    /* A hook that allows to change the state of the eyeShown variable to change the eye icon. */
    const [eyeShown, setEyeShown] = useState(true);
    const toggleEye = () => setEyeShown(!eyeShown);

    const [isLoading, setIsLoading] = useState(false);

    const [loginData,setLoginData] = useState({
        email:"",
        password:"",
    })
    /* This is the function that is triggered when the user clicks the Submit button. */
    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        const {email,password} = loginData;
        const response = await login(email,password).catch(e => {
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Correo o contraseña incorrectos',
            })
            console.log(e);
        });

        if(response.status === 201){
            iniciarSesion(response.data.accessToken);
        }
        setIsLoading(false);
    }

    return (
        <div className="login-container">
        <div className="left-side-login">
            <img 
                // src={logoIndereq} 
                // alt="Logo de INDEREQ" 
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
                <h1>Bienvenido</h1>
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

                <button type="submit" className="btn-login">
                    {isLoading
                    ? 
                        <LoadingSpinner/>
                    :
                        'Iniciar sesión'
                }
                </button>
                {/* <input 
                    type="submit" 
                    value="Iniciar Sesión" 
                    className="btn-login" 
                /> */}
            </form>
        </div>
        </div>
    );
};

export default Login;

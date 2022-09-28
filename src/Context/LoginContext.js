import React,{ createContext, useState } from "react";

export const LoginContext = createContext()
const Provider = ({children})=> {
    // La variable que controla el login
    const [isAuth,setIsAuth] = useState(()=>{
        return window.localStorage.getItem('token')
    })


    // Lo que este dentro de value podra ser accedido dentro de toda la app
    const value = {
        isAuth,
        // Iniciar sesion
        iniciarSesion:(token)=>{
            setIsAuth(true)
            window.localStorage.setItem('token',token)
            location.reload();
        },
        // Cerrar sesion
        cerrarSesion:()=>{
            setIsAuth(false)
            window.localStorage.removeItem('token')
            location.reload();
        },
    }

    return (
        <LoginContext.Provider value={value}>
            {children}
        </LoginContext.Provider>
    )
}

// Exportamos el provider y el consumer
export default {
    Provider,
    Consumer: LoginContext.Consumer
}
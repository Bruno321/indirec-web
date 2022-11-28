import React, {createContext, useState} from "react";

export const NavigationContext = createContext();

const Provider = ({children})=>{
    const [screen, setScreen] = useState(0);

    return(
      <NavigationContext.Provider value ={{
        screen,
        setScreen
      }}>
      {children}   
      </NavigationContext.Provider>   
    )
}

export default {
    Provider,
    Consumer: NavigationContext.Consumer
}
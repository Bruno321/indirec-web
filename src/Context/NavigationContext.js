import React, {createContext, useState} from "react";

export const NavigationContext = createContext();

// ? The initial value corresponds to the index of the screen that you want to put first, based on the array in MainPageRenderManager.js
const initialScreen = 3;

const Provider = ({children})=>{
    const [screen, setScreen] = useState(initialScreen);
    const [itemId,setItemId] = useState()
    return(
      <NavigationContext.Provider value ={{
        screen,
        setScreen,
        itemId,
        setItemId
      }}>
      {children}   
      </NavigationContext.Provider>   
    )
}

export default {
    Provider,
    Consumer: NavigationContext.Consumer
}
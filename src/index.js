import React, {useContext} from 'react';
import ReactDOM  from 'react-dom';
import {App} from './app'
import NavigationContext from "./Context/NavigationContext.js";
import LoginContext from './Context/LoginContext'

ReactDOM.render(
    <LoginContext.Provider>
    <NavigationContext.Provider>
        <App/>
        </NavigationContext.Provider>
    </LoginContext.Provider>

        ,
    document.getElementById('app')
    );

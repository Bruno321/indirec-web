import React, {useContext} from 'react';
import ReactDOM  from 'react-dom';
import {App} from './app'
import NavigationContext from "./Context/NavigationContext.js";

ReactDOM.render(
    <NavigationContext.Provider>
        <App/>
        </NavigationContext.Provider>
        ,
    document.getElementById('app')
    );
import React from 'react';
import ReactDOM  from 'react-dom';
import {App} from './app'
import LoginContext from './Context/LoginContext'

ReactDOM.render(
    <LoginContext.Provider>
        <App/>
    </LoginContext.Provider>
    ,
    document.getElementById('app'))
import { Router } from '@reach/router';
import React from 'react';

// Pages
import Login from './Pages/Login/Login';
import MainPage from './Pages/MainPage/MainPage';

export const App = () => {

    return(
        <div>
            <Router>
                {/* The ternary operator checks if the email in local storage is equal to
                admin@gmail.com. If it is, it will render the MainPage and Login components. If it
                is not, it will render the Login component. */}
                { localStorage.email == "admin@gmail.com" ? 
                    <>
                        <MainPage path='/' />
                        <Login path='/login' />
                    </>
                : <Login path='/' />
                }
            </Router>
        </div>
    )
}


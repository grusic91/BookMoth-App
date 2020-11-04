import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { configureStore } from 'store';
import * as actions from 'store/actions';

// components
import Header from 'components/shared/Header';
import Routes from './Routes';

import './App.css';

/* Init store. Provided from redux */
const store = configureStore();

const App = () => {

    useEffect(() => {
        checkAuthState();
    }, [])

    const checkAuthState = () => {
        
        store.dispatch(actions.checkAuthState());
    }

    return <Provider store={store}>
        <Router>
            <ToastContainer />
            <Header />
            <Routes />
        </Router>
    </Provider>  
}

export default App;

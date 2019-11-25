import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.css';

// components
import Header from './containers/shared/Header';
import Main from './containers/Main';


const store = configureStore();

const App  = () => {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <Main />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

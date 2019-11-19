import React from 'react';
import * as redux from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { BrowserRouter as Router} from 'react-router-dom'
import './App.css';

// components
import Header from './containers/shared/Header';
import BooksComponent from './containers/BooksComponent';

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App onboarding">
          <Header />
          <BooksComponent />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

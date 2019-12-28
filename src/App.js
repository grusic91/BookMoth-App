import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import { configureStore } from 'store';
import * as actions from "store/actions";

import './App.css';

// components
import Header from 'components/shared/Header';
import Main from 'containers/Main';

const store = configureStore();

class App extends React.Component {

  componentDidMount() {
    this.checkAuthState();
  }

  checkAuthState() {
    store.dispatch(actions.checkAuthState());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div
            className="App"
            style={{
              position: 'cover'
            }}>
            <ToastContainer />
            <Header />
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

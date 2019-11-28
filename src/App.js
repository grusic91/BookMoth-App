import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router} from 'react-router-dom'
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

  logoutUser() {
    store.dispatch(actions.logout());
  }

  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header logoutUser={this.logoutUser} />
            <Main />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;

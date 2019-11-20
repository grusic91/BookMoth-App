import React from 'react';
import * as redux from 'redux';
import { Provider } from 'react-redux';
import { configureStore } from './store';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import './App.css';

// components
import Header from './containers/shared/Header';
import BookList from './containers/BookList';
import BookDetail from './containers/BookDetail';

class App extends React.Component {

  render() {
    const store = configureStore();

    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Header />
            <div className="container">
              <Route exact path="/" component={BookList}/>
              <Route exact path="/book/:id" component={BookDetail}/>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }

}

export default App;

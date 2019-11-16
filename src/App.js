import React from 'react';
import './App.css';

// components
import { Header } from './components/shared/Header';

function App() {
  return (
    <div className="App">
      <Header /> 
      <p>THIS IS BOOKMOTH APP</p>

     <button type="button" className="btn btn-danger">Danger</button>
    </div>
  );
}

export default App;

import React, { Component } from 'react';
import './App.css';
import HaaderComponent from '../../component/Header/header';
import Main from '../../component/main'
import Today from '../../component/Today/today';
import History from '../../component/History/history';

class App extends Component {
  render() {
    return (
      <div className="App">
        < HaaderComponent />
        <div className="results--section__inner">
          <Today />
          <History />
        </div>
      </div>
    );
  }
}

export default App;

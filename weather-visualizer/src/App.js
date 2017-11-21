import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super()
    this.state = {
      dateStart: '2017-01-01',
      dateEnd: '2017-11-01'
    }
  }
  
  getData = () => {
    let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + this.state.dateStart + '&end=' + this.state.dateEnd
    axios.get(url)
      .then(response => this.setState({
          bitcoinData: response.data
        })
      )
    .then (console.log(this.state))
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
         Get bitcoin data
        </p>
        <button onClick={this.getData}>Get Bitcoin Data</button>
      </div>
    );
  }
}

export default App;

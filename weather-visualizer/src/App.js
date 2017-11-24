import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';

/* C3 - react-c3js */
import C3Chart from 'react-c3js';
import 'c3/c3.css';


class App extends Component {
  constructor() {
    super()
    this.state = {
      dateStart: '2017-10-01',
      dateEnd: '2017-10-07',
      data: {
        columns: [
          []
        ]
      }
    }
  }
  
  getData = () => {
    let url = 'https://api.coindesk.com/v1/bpi/historical/close.json?start=' + this.state.dateStart + '&end=' + this.state.dateEnd
    let data = []
    axios.get(url)
      .then(response => {
      data = Object.values(response.data.bpi)
      this.setState({
          data: {
            columns: [
              ['data1', ...data]
            ]
          }
        })
      })
  }

  componentDidMount() {
    this.getData ()
    
  }

  render() {
    let bitData = this.state.bitcoinData
    console.log(this.state)

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
         Get bitcoin data
        </p>
        <C3Chart data={this.state.data} />
      </div>
    );
  }
}

export default App;

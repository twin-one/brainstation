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
    let url = `http://localhost:8080/${this.state.dateStart}/${this.state.dateEnd}`
    
    axios.get(url)
      .then(response => {

        console.log(response)

        this.setState({
            data: {
              columns: [
                ['data1', ...response.data]
              ]
            }
          })
        })
  }

  componentDidMount() {
    this.getData ()
    
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
        <C3Chart data={this.state.data} />
        <button onClick={this.getData}>Get Bitcoin Data</button>
      </div>
    );
  }
}

export default App;

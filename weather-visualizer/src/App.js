import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {Button, Icon, Navbar, Col, Row, Input, NavItem} from 'react-materialize';
import Moment from 'moment';

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
                ['BitCoin Price Index', ...response.data]
              ]
            }
          })
        })
  }

  componentDidMount() {
    this.getData ()
    
  }

  //Sets new date on selection from user.
  setDateStart = (e, value) => {
    let newValue = Moment(value).format('YYYY-MM-DD')
    this.setState ({
      dateStart: newValue
    })
   this.getData ()
  }

// same as prior function
  setDateEnd = (e, value) => {
    let newValue = Moment(value).format('YYYY-MM-DD')
    this.setState ({
      dateEnd: newValue
    })
    this.getData ()
  }


  render() {
    return (
      <div className="App">
        <h3>
         Bitcoin Price Index Chart
        </h3>
        <Row>
          <Col s={8} offset='s2'>
            <C3Chart data={this.state.data} />
            <Input s={6} placeholder="Start Date" name='on' type='date' onChange={this.setDateStart} />
            <Input s={6} placeholder="End Date" name='on' type='date' onChange={this.setDateEnd} />
          </Col>
        </Row>  
      </div>
    );
  }
}

export default App;

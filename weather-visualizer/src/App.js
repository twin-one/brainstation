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
      dateStart: "",
      dateEnd: "",
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

    var date = new Date();

    let todaysDate = Moment(date).format('YYYY-MM-DD')
    
    date.setDate(date.getDate() - 7)

    let sevenDaysAgo = Moment(date).format('YYYY-MM-DD')

    console.log(`convertedDate: ${sevenDaysAgo}`);

    this.setState({
      dateStart: sevenDaysAgo,
      dateEnd: todaysDate
    }, () => this.getData ())
  }

  // Sets new date on selection from user.
  setDateStart = (e, value) => {
    let newValue = Moment(value).format('YYYY-MM-DD')

    this.compareDates(newValue, this.state.dateEnd)
  }

  compareDates = (sDate, eDate) => {

    let dateStart = sDate
    let dateEnd   = eDate

    console.log(`dateStart: ${dateStart}, dateEnd: ${dateEnd}`)

    var d1 = new Date(dateStart);
    var d2 = new Date(dateEnd);

    if (d1 > d2) {
      alert("Please check dates. Start date is greater than End date.")
    } else {
      this.setState ({
        dateStart: dateStart,
        dateEnd: dateEnd
      }, () => console.log(this.state))
      this.getData ()
    }
  }

  // same as prior function
  setDateEnd = (e, value) => {
    let newValue = Moment(value).format('YYYY-MM-DD')

    this.compareDates(this.state.dateStart, newValue)
  }

  render() {
    return (
      <div>
        <Navbar brand='Bitcoin' className="navBar"></Navbar>
        <div className="App">
          <h3>
          Bitcoin Price Index Chart
          </h3>
          <Row>
            <Col s={8} offset='s2'>
              <C3Chart data={this.state.data} />
              <Input s={6} placeholder="Start Date" value={this.state.dateStart} name='on' type='date' onChange={this.setDateStart} />
              <Input s={6} placeholder="End Date" value={this.state.dateEnd} name='on' type='date' onChange={this.setDateEnd} />
            </Col>
          </Row>  
        </div>
      </div>
    );
  }
}

export default App;

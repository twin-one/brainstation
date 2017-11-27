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
        x: 'x',
        columns: [
          []
        ],
      },
      axis: {
        x: {
          type: 'timeseries',
          tick: {
            format: '%Y-%m-%d'
        }
        }
      }
    }
  }
  
  getData = () => {
    let url = `http://localhost:8080/${this.state.dateStart}/${this.state.dateEnd}`

    axios.get(url)
      .then(response => {
        let data = Object.values(response.data)
        let keys = Object.keys(response.data)
        this.setState({
            data: {
              columns: [
                ['x', ...keys],
                ['BitCoin Price Index', ...data]
              ]
            },
            axis: {
              x: {
                categories: [...keys]
              }
            }
          })
        })
  }

  componentDidMount() {
   this.xDaysAgo(7)
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

dateSelect = (e) => {
  let value = e.target.value
  if (value === '1') {
   this.xDaysAgo(7)
  } else if (value === '2') {
    this.xDaysAgo(30)
  } else if (value === '3') {
    this.xDaysAgo(365)
  }
}

xDaysAgo =  (numDays) => {
  var date = new Date();
  let todaysDate = Moment(date).format('YYYY-MM-DD')
  
  date.setDate(date.getDate() - numDays)

  let sevenDaysAgo = Moment(date).format('YYYY-MM-DD')

  this.setState({
    dateStart: sevenDaysAgo,
    dateEnd: todaysDate
  }, () => this.getData ())
}


  render() {
    console.log(this.state)
    return (
      <div>
        <Navbar brand='Bitcoin' className="navBar"></Navbar>
        <div className="App">
          <h3>
          Bitcoin Price Index Chart
          </h3>
          <Row>
            <Col s={8} offset='s2'>
              <C3Chart data={this.state.data} axis={this.state.axis}/>
              <Input s={12} type='select' label="Date Select" defaultValue='1' onChange={ e => this.dateSelect(e)}>
                <option value='1'>Last Week</option>
                <option value='2'>Last Month</option>
                <option value='3'>Last Year</option>
              </Input>
              <Input s={6} label="Start Date" placeholder="Start Date" value={this.state.dateStart} name='on' type='date' onChange={this.setDateStart} />
              <Input s={6} label="End Date" placeholder="End Date" value={this.state.dateEnd} name='on' type='date' onChange={this.setDateEnd} />
            </Col>
          </Row>
          
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './history.css'
import moment from 'moment';
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
class History extends Component {
    constructor() {
        super();
        this.state = {
            todayprice: {},
            selectedDate: new Date()
        }
        this.getBTCPrices = this.getBTCPrices.bind(this);
        this.getETHPrices = this.getETHPrices.bind(this);
        this.getLTCPrices = this.getLTCPrices.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    // This function gets the ETH price for a specific timestamp/date. The date is passed in as an argument
    getETHPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=ETH&tsyms=USD&ts=' + date);
    }
    // This function gets the BTC price for a specific timestamp/date. The date is passed in as an argument
    getBTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=BTC&tsyms=USD&ts=' + date);
    }
    // This function gets the LTC price for a specific timestamp/date. The date is passed in as an argument
    getLTCPrices(date) {
        return axios.get('https://min-api.cryptocompare.com/data/pricehistorical?fsym=LTC&tsyms=USD&ts=' + date);
    }
    // This function gets the prices for the current date.
    getSelectedDayPrice() {
        // Get today's date in timestamp
        let t = moment().unix(this.state.selectedDate);
        // axios.all is used to make concurrent API requests. These requests were the functions we first created and they accept an argument of the date required.
        axios.all([this.getETHPrices(t), this.getBTCPrices(t), this.getLTCPrices(t)])
            .then(axios.spread((eth, btc, ltc) => {
                let f = {
                    date: moment.unix(t).format("MMMM Do YYYY"),
                    eth: eth.data.ETH.USD,
                    btc: btc.data.BTC.USD,
                    ltc: ltc.data.LTC.USD
                }
                // Set the state of todayprice to the content of the object f
                this.setState({ todayprice: f });
            }));
    }
    handleChange(date) {
        this.setState({
            selectedDate: date
        });
        this.getSelectedDayPrice();
    }
    // This is called when an instance of a component is being created and inserted into the DOM.
    componentWillMount() {
        this.getSelectedDayPrice();
    }

    render() {
        return (
            <div className="history--section container">
                <div className="history--section__box">
                    <label>Select Date</label>
                    <DatePicker
                        selected={this.state.selectedDate}
                        onChange={this.handleChange}
                    />
                    <div className="history--section__box__inner">
                        <div className="columns">
                            <div className="column">
                                <p>1 BTC = ${this.state.todayprice.btc}</p>
                            </div>
                            <div className="column">
                                <p>1 ETH = ${this.state.todayprice.eth}</p>
                            </div>
                            <div className="column">
                                <p>1 LTC = ${this.state.todayprice.ltc}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default History;
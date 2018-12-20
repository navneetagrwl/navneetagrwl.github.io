import React, { Component } from 'react';
import logo from '../../logo.svg';

class HaaderComponent extends Component {
    render() {
        return (
            <header className="App-header">
                <img style={{ width: 100 }} src={logo} className="App-logo" alt="logo" />
            </header>
        )
    }
};
export default HaaderComponent;
import React, { Component } from 'react';
import 'whatwg-fetch';


class Series extends Component {
    componentDidMount() {
        // let myheaders = {
        //   "Content-Type": "application/json",
        //   "Authorization": "Basic 1 eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2Vycy9Uek1Vb2NNRjRwIiwiZXhwIjoxNjA5MzUzMDAwLCJuYW1lIjoiTmF2bmVldCIsInBhc3N3b3JkIjoiTmF2bmVldEAxMjMiLCJzY29wZSI6InNlbGYsZ3JvdXBzL2FkbWlucyJ9.Xs4JkdlF4FnOnglixlbhNAntLeoxtwR1hDUu8JEy03E"
        // }
        fetch('https://jsonplaceholder.typicode.com/todos')
            .then(resp => resp.json()).then(result => {
                this.setState({ series: result });
            }
            );
    }
    state = {
        series: []
    }
    render() {
        return (
            <ul>
                {this.state.series.map(item => (
                    <li key={item.id}>
                        {item.title}
                    </li>
                ))}
            </ul>
        );
    }
}

export default Series;
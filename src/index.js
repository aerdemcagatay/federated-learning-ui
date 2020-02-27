import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//import App from './App';
import * as serviceWorker from './serviceWorker';


class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hospitals: []
        };
    }

    handleSearch = () => {
        let url = 'http://localhost:4910/clients';
        fetch(url).then(response => response.json()).then((hospitals) => {
            this.setState({
                hospitals: hospitals
            });
        });
    };

    handleEnroll = (user) => {
        const data = '{"name": "' + user + '"}';
        fetch('http://localhost:4910/enroll', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: data
        });
    };

    render() {
        return (
            <div className="app-container">
                <h3>Enrollment</h3>
                <SearchButton handleSubmit={this.handleSearch}/>
                <SearchBar handleSubmit={this.handleEnroll}/>
                <RepoList hospitals={this.state.hospitals}/>
            </div>
        )
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        };
        this.onHandleChange = this.onHandleChange.bind(this);
        //.onHandleSubmit = this.onHandleSubmit.bind(this);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const text = event.target.text.value;
        this.props.handleSubmit(text);
        this.setState({
            name: ''
        });
    };

    onHandleChange(event) {
        this.setState({
            name: event.target.value
        });
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <input
                    onChange={this.onHandleChange}
                    name="text"
                    className="form-control"
                    type="text"
                    value={this.state.name}
                    placeholder="Introduce yourself and press ENTER"
                />
            </form>
        );
    }
}

class SearchButton extends React.Component {
    constructor(props) {
        super(props);
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.handleSubmit();
    };

    render() {
        return (
            <button onClick={this.handleSubmit}>Search</button>
        );
    }
}


class RepoList extends React.Component {

    render() {
        var rows = [];
        this.props.hospitals.map((hospital, index) => rows.push(<RepoItem key={index} hospital={hospital}/>))
        return (
            <div className="list">
                {rows}
            </div>
        )
    }
}

RepoList.defaultProps = {
    hospitals: []
};

class RepoItem extends React.Component {
    render() {
        return (
            <a href="#" className="list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-between">
                    <h5 className="mb-1">{this.props.hospital.name}</h5>
                </div>

            </a>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('root'));
//ReactDOM.render(<Card/>, document.getElementById('root'));


//ReactDOM.render(<Card />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

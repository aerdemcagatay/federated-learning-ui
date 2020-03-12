import React from 'react';
import ReactDOM from 'react-dom';
import Guidance from '../Guidance/guidance-page'
import { Button, Input, List, Avatar } from "antd";
import './LoginPage.css'

const { Search } = Input;

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            hospitals: []
        };
    }

    handleSearch = () => {
        let url = 'http://localhost:4910/clients';
        fetch(url).then(response => response.json()).then(
            (hospitals) => {
                this.setState({
                    hospitals: hospitals
                });
            }
        );
    };

    handleEnroll = (user) => {
        if(user.length > 0)
        {
            var names = [];
            let url = 'http://localhost:4910/clients';
            fetch(url).then(response => response.json()).then(
                (hospitals) => {
                    let hospitalsCopy = hospitals.slice();
                    hospitalsCopy.map((hospital) => names.push(hospital.name));
    
                    if(names.includes(user))
                    {
                        alert("User already registered.");                    
                    }
                    else
                    {
                        const data = '{"name": "' + user + '"}';
                        fetch('http://localhost:4910/enroll', {
                            headers: {
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            method: 'POST',
                            body: data
                        });
                        window.location.reload();
                    }                
                }
            );        
        }
        else
        {
            alert("Please type something");
        }        
    };

    handleLogin = (credentials) => {
        if(credentials.length)
        {
            var names = [];

            let url = 'http://localhost:4910/clients';
            fetch(url).then(response => response.json()).then(
                (hospitals) => {
                    let hospitalsCopy = hospitals.slice();
                    hospitalsCopy.map((hospital) => names.push(hospital.name));

                    if(names.includes(credentials))
                    {
                        ReactDOM.render(<Guidance/>, document.getElementById('root'));
                    }
                    else
                    {
                        alert("Sign up from above input bar please.");
                    }                
                }
            );        
        }
        else
        {
            alert("Please type something");
        }        
    };


    render() {
        return (
            <div className="app-container">
                <h3>Enrollment</h3>
                <SearchButton handleSubmit={this.handleSearch}/>
                <RepoList hospitals={this.state.hospitals}/>
                <SearchBar handleSubmit={this.handleEnroll}/>
                <LoginButton handleSubmit={this.handleLogin}/>
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
    }

    handleSubmit = (credentials) => {
        let text = credentials;
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
            /*
            <form onSubmit={this.handleSubmit}>
                <Input
                    size="large" 
                    placeholder="large size" 
                    onChange={this.onHandleChange}
                    name="text"
                    className="form-control"
                    type="text"
                    style={{marginTop : 10}}
                    value={this.state.name}
                    placeholder="Introduce yourself and press ENTER"
                />
            </form>,
            */
            <Search
            placeholder="Introduce yourself"
            enterButton="Sign Up"
            size="large"
            onSearch={(credentials) => this.handleSubmit(credentials)}
            style={{margin : 10}}
            />
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
            <Button type="primary" 
            style={{margin: 10}}
            color = "primary-color"
            onClick={this.handleSubmit}>Search Hospitals</Button>
        );
    }
}

class LoginButton extends React.Component{
    handleSubmit = (credentials) => {
        this.props.handleSubmit(credentials);
    };

    render() {
        return (
            <Search
            placeholder="Enter your username to login"
            enterButton="Login"
            size="large"
            onSearch={(credentials) => this.handleSubmit(credentials)}
            style={{margin: 10}}
            />
            /*
            <Button type="primary" 
            style={{ marginLeft: 8 }}
            color = "primary-color"
            onClick={this.handleSubmit}>Login</Button>
            */
        );
    }
}

class RepoList extends React.Component {

    render() {
        var rows = [];
        this.props.hospitals.map((hospital, index) => rows.push(<RepoItem key={index} hospital={hospital}/>))
        return (
            <List
                dataSource = {rows}
                renderItem={(item, index) => (
                    <List.Item>
                        <List.Item.Meta
                        avatar={<Avatar src="https://f0.pngfuel.com/png/492/150/red-cross-logo-png-clip-art.png" />}
                        title={<a href="https://ant.design">{item.title}</a>}
                        description={rows[index]}
                        style={{fontsize: 40}, {margin: 10}}
                        />
                    </List.Item>
                )}
            >
            </List>
        )
    }
}

RepoList.defaultProps = {
    hospitals: []
};

class RepoItem extends React.Component {
    render() {
        return (
            <a href="#" className="list-group-item">
                {this.props.hospital.name}
            </a>
        )
    }
}
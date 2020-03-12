import React from 'react';
import ReactDOM from 'react-dom';
import { Button } from "antd";

import './guidance-page.css';
import LoginPage from '../Login/LoginPage';

export default class Guidance extends React.Component
{
    handleLogout = () => {
        ReactDOM.render(<LoginPage/>, document.getElementById('root'));
    };

    render() {
        return (
            <div className="app-container">
                <h3>Gibberish</h3>                
                <h5>Kafka guidance</h5>
                <LogoutButton handleSubmit={this.handleLogout}/>
            </div>
        )
    }
}

class LogoutButton extends React.Component{
    handleSubmit = () => {
        this.props.handleSubmit();
    };

    render() {
        return (
            <Button type="primary" 
            style={{ marginLeft: 8 }}
            color = "primary-color"
            onClick={this.handleSubmit}>Logout</Button>
        );
    }
}
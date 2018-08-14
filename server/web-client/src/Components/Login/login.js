import React, { Component } from 'react';
import './login.css';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import UploadFile from './UploadFile';
import { Redirect } from 'react-router'
import PropTypes from 'prop-types';
import { truncate } from 'fs';
import ApiCaller from '../../utils/api.caller';
const loginUrl = '/api/authenticate'
class Login extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this)
        this.state = {
            loginRole: 'Admin'
        }
    }
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        if (selectedOption) {
            console.log('Selected: ${selectedOption.label}');
        }
    }

    async handleClick(event) {

        event.preventDefault();
        var apiSend = {
            "name": document.getElementById("username1").value,
            "password": document.getElementById("password1").value
        }
        if (apiSend.username === "" || apiSend.password === "") {
            this.setState({
                message: 'Please provide valid details'
            })
            return;
        }
        var response = await ApiCaller.apiRequest({
            url: loginUrl,
            method: 'post',
            data: JSON.stringify(apiSend)
        }).catch((error) => {
            console.log("Error caught in catch", error);
            this.setState({
                message: "Something is wrong here."
            })
        });

        if (response.status == 200) {
            const loginData = await response.json();
            if (loginData.success) {
                ApiCaller.setToken(loginData.token);
                this.props.onLogin(loginData);
            } else {
                this.setState({
                    message: loginData.message
                })
            }
        } else {
            this.setState({
                message: "Something is wrong here."
            })
        }

    }

    render() {
        const { selectedOption } = this.state;


        return (


            <div className="container container-fluid login-conatiner">
                <div style={{
                    maxWidth: '300px',
                    margin: '0 auto'
                }}>
                    <div className="login-form">
                        <form method="post">
                            <h2 className="text-center">Log in</h2>
                            <div className="form-group">
                                <Select
                                    name="form-field-name"
                                    placeholder="Select mode.."
                                    searchable={false}
                                    clearable={false}
                                    value={selectedOption}
                                    onChange={this.handleChange}
                                    options={[
                                        { value: '1', label: 'Admin' },
                                        { value: '2', label: 'User' },
                                    ]}
                                />
                            </div>


                            <div className="form-group">
                                <input type="text" className="form-control"
                                    id="username1" placeholder="Username" required="required" />
                            </div>
                            <div className="form-group">
                                <input
                                    id="password1" type="password" className="form-control" placeholder="Password" required="required" />
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={this.handleClick} className="btn btn-primary btn-block">Log in</button>
                            </div>
                            <div className="clearfix">
                            </div>
                        </form>
                        {this.state.message && <p className="alert alert-danger fade in">{this.state.message}</p>}
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;


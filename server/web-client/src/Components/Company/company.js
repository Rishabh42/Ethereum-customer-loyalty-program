import React, { Component } from 'react';
import ApiCaller from '../../utils/api.caller';
const loginUrl = '/api/enroll';
const enrollEmp = 'api/enrollEmp';
const addAddsUrl = 'api/addAd';

const KeyCodes = {
    comma: 188,
    enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];
class Company extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
        this.loadCompanies = this.loadCompanies.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addEmp = this.addEmp.bind(this);
        this.addAds = this.addAds.bind(this);
        this.state = {
            loginRole: 'Admin',
            enrollScreen: false,
            numofUser: 0,
            value: "",
            companies: [],
            ads: [],
            addr: '...',
        }
    }
    handleChange(event) {
        this.setState({ value: event.target.value });
    }

    componentDidMount() {
        !this.state.enrollScreen && this.loadCompanies();
    }

    async addEmp(event) {
        event.preventDefault();
        const data = new FormData();
        data.append('file', this.uploadInput.files[0]);
        data.append('cId', this.state.value);
        var response = await ApiCaller.apiRequest({
            isUpload: true,
            url: enrollEmp,
            method: 'post',
            data: data
        }).catch(async (error) => {
            console.log("Error caught in catch", error);
            this.setState({
                msg: "Something is wrong here. Can't add user"
            })
        });
        if (response && response.status == 200) {
            const loginData = await response.json();
            if (loginData.success) {
                // alert(`Now we have ${loginData.total} companies enrolled`);
                //this.loadCompanies();
                alert('User added')
            } else {
                this.setState({
                    msg: loginData.message
                })
            }
        } else {
            this.setState({
                msg: "Something is wrong here."
            })
        }

    }

    async handleClick(event) {
        event.preventDefault();
        var apiSend = {
            "name": document.getElementById("cname").value,
            "password": document.getElementById("pwd").value
        }
        if (apiSend.name === "") {
            this.setState({
                message: 'Please provide valid details'
            })
            return;
        }
        var response = await ApiCaller.apiRequest({
            url: loginUrl,
            method: 'post',
            data: JSON.stringify(apiSend)
        }).catch(async (error) => {
            console.log("Error caught in catch", error);
            this.setState({
                message: "Something is wrong here."
            })
        });
        if (response && response.status == 200) {
            const loginData = await response.json();
            if (loginData.success) {
                // alert(`Now we have ${loginData.total} companies enrolled`);
                this.loadCompanies();
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



    async loadCompanies() {
        this.setState({
            loading: true
        });
        var response = await ApiCaller.apiRequest({
            url: "/api/getCompamies",
            method: 'get'
        }).catch((error) => {
            console.log("Error caught in catch", error);
            this.setState({
                message: "Something is wrong here."
            })
        });
        if (response && response.status == 200) {
            const loginData = await response.json();
            if (loginData.success) {
                this.setState({
                    companies: [...loginData.companies],
                    message: null,
                    value: '0',
                    addr: loginData.addr
                })
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

    async addAds(event) {
        event.preventDefault();
        var apiSend = {
            "text": document.getElementById("adName").value,
            "price": document.getElementById("adPrice").value || 0,
            "cId": this.state.value
        }
        if (apiSend.price === "") {
            this.setState({
                msg1: 'Please provide valid details'
            })
            return;
        }
        var response = await ApiCaller.apiRequest({
            url: addAddsUrl,
            method: 'post',
            data: JSON.stringify(apiSend)
        }).catch(async (error) => {
            console.log("Error caught in catch", error);
            this.setState({
                msg1: "Something is wrong here."
            })
        });
        if (response && response.status == 200) {
            const loginData = await response.json();
            if (loginData.success) {
                this.setState({
                    msg1: loginData.message
                });
                alert('Ad saved');
            } else {
                this.setState({
                    msg1: loginData.message
                })
            }
        } else {
            this.setState({
                msg1: "Something is wrong here."
            })
        }
    }

    render() {
        return (
            <div className="container container-fluid login-conatiner">
                <div className="alert alert-success">
                    Smart Contract Deployed at <strong>{this.state.addr}</strong>  <a href="/api/contract" target="_blank" className="alert-link">More Details.</a>.
                </div>
                <div className="col-md-4">
                    <div className="login-form">
                        <form method="post" autocomplete="off">
                            <h2 className="text-center">Enroll Company</h2>
                            <div className="form-group">
                                <input type="text" className="form-control"
                                    id="cname" autocomplete="off" placeholder="Company Name" required="required" />
                            </div>
                            <div className="form-group">
                                <input autocomplete="off" type="password" className="form-control"
                                    id="pwd" placeholder="PassKey" required="required" />
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={this.handleClick} className="btn btn-primary btn-block">Enroll</button>
                            </div>
                            <div className="clearfix">
                            </div>
                        </form>
                        {this.state.message && <p className="alert alert-danger fade in">{this.state.message}</p>}
                    </div>
                </div>
                <div className="col-md-6 col-md-offset-2">
                    <div className="c-list">
                        <p className="bg-primary large-list">Enrolled Companies.</p>
                        {this.state.companies.map(function (x, i) {
                            return <p key={i} className="text-primary"> {x.name}</p>;
                        })}
                    </div>
                </div>




<div className="col-md-12">

                {<div className="col-md-12 addemp" id="add_emp">
                    <div className="login-form">
                        <form method="post" autocomplete="off">
                            <h2 className="text-center">Import Employees</h2>
                            <div className="form-group">
                                <input className="form-control" ref={(ref) => { this.uploadInput = ref; }} type="file" />
                            </div>
                            <div className="form-group">
                                <p>Select Company</p>
                                <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                                    {this.state.companies.map(function (x, i) {
                                        return <option key={i} value={i}>{x.name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={this.addEmp} className="btn btn-primary btn-block">Enroll Users</button>
                            </div>
                            <div className="clearfix">
                            </div>
                        </form>
                        {this.state.msg && <p className="alert alert-danger fade in">{this.state.msg}</p>}
                    </div>
                </div>
                }



                <div className="col-md-4 addad" id="add_ad">
                    <div className="login-form">
                        <form method="post" autocomplete="off">
                            <h2 className="text-center">Create Ads</h2>
                            <div className="form-group">
                                <p>Select Company</p>
                                <select className="form-control" value={this.state.value} onChange={this.handleChange}>
                                    {this.state.companies.map(function (x, i) {
                                        return <option key={i} value={i}>{x.name}</option>;
                                    })}
                                </select>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control"
                                    id="adName" autocomplete="off" placeholder="Ad String" required="required" />
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control"
                                    id="adPrice" type="number" placeholder="Ad Price" required="required" />
                            </div>
                            <div className="form-group">
                                <button type="submit" onClick={this.addAds} className="btn btn-primary btn-block">Create Ad</button>
                            </div>
                            <div className="clearfix">
                            </div>
                        </form>
                        {this.state.msg1 && <p className="alert alert-danger fade in">{this.state.msg1}</p>}
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default Company;

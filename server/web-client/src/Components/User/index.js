import React, { Component } from 'react';
import ApiCaller from '../../utils/api.caller';
import './user.css';
class User extends Component {
    constructor(props) {
        super(props);
        this.loadAds = this.loadAds.bind(this);
        this.state = {
            ads: [],
            loading: false
        }
    }

    componentDidMount() {
        this.loadAds();
    }
    async loadAds() {
        this.setState({
            loading: true
        });
        var response = await ApiCaller.apiRequest({
            url: "/api/getReedemable",
            method: 'get'
        }).catch((error) => {
            console.log("Error caught in catch", error);
            this.setState({
                message: "Something is wrong here."
            })
        });
        if (response && response.status == 200) {
            const loginData = await response.json();
            if (loginData.success && loginData.Ads) {
                this.setState({
                    ads: [...loginData.Ads],
                    message: null
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
    async redeemNow(aId, ad) {
        var apiSend = {
            "aId": aId,
            "uId": this.props.uId
        };
        var response = await ApiCaller.apiRequest({
            url: 'api/redeem',
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
                this.setState({
                    message: loginData.message
                })
                alert(loginData.message);
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
        return (
            <div className="container container-fluid login-conatiner">
                <div className="alert alert-success">
                    Welcome <strong>{this.props.name} !</strong>
                    <br />
                    <hr />


                </div>
                {this.state.message && <div className="alert alert-info">
                {
                    this.state.message
                }</div>}
                <div className="container-fluid">
                    {this.state.ads.map((x, i) => {
                        return <div className="card col-md-3">
                            <div className="card-block">
                                <h4 className="card-title">Advertisement #{i}</h4>
                                <p className="card-text">{x.text}</p>
                                <a href="#" onClick={(e) => { e.preventDefault();; this.redeemNow(i, x) }} className="btn btn-primary">Reedem</a>
                            </div>
                        </div>;
                    })}

                </div>
            </div>
        );
    }
}

export default User;


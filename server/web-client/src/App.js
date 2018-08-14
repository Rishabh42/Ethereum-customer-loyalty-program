import React, { Component } from 'react';
import './App.css';
import Login from './Components/Login/login';
import Company from './Components/Company/company';
import UserPage from './Components/User'
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogedIn: false
    }
    this.login = this.login.bind(this);
}
login(data){
  this.setState({
    isLogedIn: true,
    isAdmin: data.isAdmin,
    user: data.user
  })
}

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Loyalty Exchange Program</h1>
        </header>
       {!this.state.isLogedIn  && <Login onLogin={this.login}/>} 
       {this.state.isLogedIn && this.state.isAdmin && <Company />} 
       {this.state.isLogedIn && !this.state.isAdmin && <UserPage  {...this.state.user}/>} 
      </div>
    );
  }
}

export default App;


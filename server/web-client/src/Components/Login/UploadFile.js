import React, { Component } from 'react';
import axios, { post } from 'axios';
import ApiCaller from '../../utils/api.caller';
class Upload extends Component {

  constructor(props) {
    super(props);
    this.state ={
      file:null
    }
    this.onFormSubmit = this.onFormSubmit.bind(this)
    this.onChange = this.onChange.bind(this)
    this.fileUpload = this.fileUpload.bind(this)
  }
  async onFormSubmit(e){
    e.preventDefault(); // Stop form submit
    var response2 = await ApiCaller.apiRequest({
      url: '/api/users',
      method: 'get'
  });
  console.log(response2);
    this.fileUpload(this.state.file).then((response)=>{
      console.log(response.data);
    })
  }
  onChange(e) {
    this.setState({file:e.target.files[0]})
  }
  
  fileUpload(file){
    const url = '';
    const formData = new FormData();
    formData.append('file',file)
    const config = {
        headers: {
            'content-type': 'multipart/form-data'
        }
    }
    return  post(url, formData,config)
  }

  render() {
    return (           
      
      <div className="container container-fluid login-conatiner">
    <div style={{
        maxWidth: '300px',
        margin: '0 auto'
    }}>

      <div className="login-form">
      <form method="post" onSubmit={this.onFormSubmit}>
          <h2 className="text-center">Upload Users</h2>

          <div className="form-group">
          <input type="file" onChange={this.onChange} className="form-control" required="required"/>
          </div>
          <div className="form-group">
          <button type="submit" className="btn btn-primary btn-block">Upload</button>
          </div>
          <div className="clearfix">
          </div>
      </form>

  </div>
  </div>
  </div>
  )
  }
}

export default Upload
import React from 'react';
import '../Style.css';
import logo from '../static/logo.png';
import {Link} from 'react-router';
import {firebaseApp} from '../firebase';

class Login extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      email: '',
      password: '',
      error: {
        message:''
      }
    }
  }
  signIn(){
    console.log('this.state:', this.state);
    const {email, password} = this.state;
    firebaseApp.auth().signInWithEmailAndPassword(email, password)
    .catch(error => {
      this.setState({error})
    })
  }
  render(){
  return (
    <div className="login-page">
      <div className="login-form">
        <a href="/" className="logo">
          <img src={logo} alt="Logo" className="logo-image"></img>
          <p className="logo-text">
            team
            <br /> Datathon
          </p>
        </a>
        <div className="row m-login-top">
          <div className="col-sm p-1">
            <h1>Welcome</h1>
            <p>Use your log in credentials to access your account.</p>
          </div>
          <div className="col-sm">
            <div className="form-group">
              <label for="email">Email address</label>
              {/* <input type="text" class="form-control" id="email" /> */}
              <input 
                className="form-control"
                id="email"
                type="text"
                placeholder="email"
                onChange={event => this.setState({email: event.target.value})}
              />
            </div>
            <div className="form-group">
              <label for="password">Password</label>
              {/* <input type="password" class="form-control" id="password" /> */}
              <input 
                id="password"
                className="form-control"
                type="password"
                placeholder="password"
                onChange={event => this.setState({password: event.target.value})}
              />
            </div>
            {/* <button type="button" class="button button-green"> */}
            <button type="button" className="button button-green" onClick={() => this.signIn()}>Login</button>
            <div><Link to={'/signup'}>Sign up instead</Link></div>
            
              {/* Log in */}
            {/* </button> */}
          </div>
        </div>
        <br/>
          <div className="text-danger text-warning">{this.state.error.message}</div>
      </div>

      <div className="footer">
        <div className="footer-text">
          <p>© Datathon Melbourne Team 2019</p>
          <p>
            All Rights Reserved. Terms & Conditions. Designed by Team Datathon
          </p>
        </div>
      </div>
    </div>
  );
  }
}

export default Login;

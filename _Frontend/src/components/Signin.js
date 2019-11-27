import React, {Component} from 'react';
import {Link} from 'react-router';
import {firebaseApp} from '../firebase';
class Signin extends Component {
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
      <div className="loginform jumbotron">
          <div className="row ">
            <div className="logo">
                {/* <img src="./resources/images/logo.png"/> */}
            </div>
            
          </div>
          <div className="row">
              <div className="col-sm-6">
                  <h1 className="text-primary">Welcome</h1>
                  <p>Use your log in credentials to access your account</p>
              </div>
              <div className="col-sm-6">
                  <div className="form-group">
                      <p className="text-secondary">Username or Email address</p>
                      <input 
                        className="col-sm-12"
                        type="text"
                        placeholder="email"
                        onChange={event => this.setState({email: event.target.value})}
                      />
                      <br/><br/>
                      <p className="text-secondary">Password</p>
                      <input 
                        className="col-sm-12"
                        type="password"
                        placeholder="password"
                        onChange={event => this.setState({password: event.target.value})}
                      />
                      <br/><br/>
                      <button type="button" className="btn btn-primary btn-login" onClick={() => this.signIn()}>Login</button>
                      <div><Link to={'/signup'}>Sign up instead</Link></div>
                  </div>
              </div>
              <div className="text-danger text-warning">{this.state.error.message}</div>
              
          </div>
        </div>
      
    );
  }
}

export default Signin;
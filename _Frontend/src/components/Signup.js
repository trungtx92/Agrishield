import React, {Component} from 'react';
import {Link} from 'react-router';
import {firebaseApp} from '../firebase';
class Signup extends Component {
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

  signUp(){
    console.log('this.state:', this.state);
    const {email, password} = this.state;
    firebaseApp.auth().createUserWithEmailAndPassword(email, password)
    .catch(error => {
      this.setState({error})
    })
  }

  render(){
    return (
      <div className='loginform jumbotron'>
        <h2>Sign Up</h2>
        <div>
          <input 
            className="col-sm-6"
            type="text"
            placeholder="email"
            onChange={event => this.setState({email: event.target.value})}
          />
          <br/><br/>
          <input 
            className="col-sm-6"
            type="password"
            placeholder="password"
            onChange={event => this.setState({password: event.target.value})}
          />
          <br/><br/>
          <button className="btn btn-primary"
            type="button"
            onClick={() => this.signUp()}
          > Sign Up </button>
          <div className="text-danger">{this.state.error.message}</div>
          <br/>
          <div><Link to={'/signin'}>Already a user? Sign in instead</Link></div>
        </div>
      </div>
    );
  }
}

export default Signup;

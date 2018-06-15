import React, { Component } from 'react';
import { firebaseAuth } from './firebase'

export default class AuthBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: ''
    }
  }

  inputChange = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
    console.log({
      [name]: value
    })
  }

  login = () => {
    const { email, password } = this.state
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(user => this.setState({message: JSON.stringify(user)}))
      .catch(err => this.setState({message: JSON.stringify(err)}))
  }

  render() {
    return (
      <div>
        <div>
          <span>Email:</span>
          <input type='text' name='email' onChange={this.inputChange}/>
          <span>Password</span>
          <input type='password' name='password' onChange={this.inputChange}/>
          <button onClick={this.login}>Login</button>
          <button onClick={this.signup}>Signup</button>
        </div>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

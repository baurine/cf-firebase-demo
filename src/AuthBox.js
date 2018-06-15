import React, { Component } from 'react';

export default class AuthBox extends React.Component {
  render() {
    return (
      <div>
        <span>Email:</span>
        <input type='text' name='email'/>
        <span>Password</span>
        <input type='password' name='password'/>
        <button>Login</button>
        <button>Signup</button>
      </div>
    )
  }
}

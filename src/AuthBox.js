import React from 'react';
import { firebaseAuth } from './firebase'

import TodoList from './TodoList'

export default class AuthBox extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      message: 'loading...',
      user: null
    }
  }

  componentDidMount() {
    firebaseAuth.onAuthStateChanged(user => {
      this.setState({user, message:JSON.stringify(user)})
    })
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
    this.setState({message: 'loading...'})
    const { email, password } = this.state
    firebaseAuth.signInWithEmailAndPassword(email, password)
      .then(user => this.setState({message: JSON.stringify(user), user}))
      .catch(err => this.setState({message: JSON.stringify(err)}))
  }

  signup = () => {
    this.setState({message: 'loading...'})
    const { email, password } = this.state
    firebaseAuth.createUserWithEmailAndPassword(email, password)
      .then(user => this.setState({message: JSON.stringify(user), user}))
      .catch(err => this.setState({message: JSON.stringify(err)}))
  }

  signout = () => {
    firebaseAuth.signOut()
  }

  render() {
    return (
      <div>
        {
          !this.state.user &&
          <div>
            <span>Email:</span>
            <input type='text' name='email' onChange={this.inputChange}/>
            <span>Password</span>
            <input type='password' name='password' onChange={this.inputChange}/>
            <button onClick={this.login}>Login</button>
            <button onClick={this.signup}>Signup</button>
            <p>{this.state.message}</p>
          </div>
        }
        {
          this.state.user &&
          <div>
            <button onClick={this.signout}>SignOut</button>
            <TodoList user={this.state.user}/>
          </div>
        }
      </div>
    )
  }
}

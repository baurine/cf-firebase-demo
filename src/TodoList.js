import React from 'react'

import { firebaseDb } from './firebase'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      // todos: [
      //   {
      //     text: 'Do creative friday',
      //     created_at: new Date().toISOString()
      //   }
      // ]
      todos: []
    }
  }

  inputChange = (e) => {
    this.setState({text: e.target.value})
  }

  addTodo = (e) => {
    e.preventDefault()
    const todo = {
      text: this.state.text,
      created_at: new Date().toISOString(),
      author: this.props.user.email
    }
    // const newTodos = this.state.todos.concat(todo)
    // this.setState({todos: newTodos, text: ''})
    firebaseDb.collection('todos')
      .add(todo)
      .then(todoRef => {
        const newTodo = {
          id: todoRef.id,
          ...todo
        }
        const newTodos = this.state.todos.concat(newTodo)
        this.setState({todos: newTodos, text: ''})
      })
  }

  delTodo = (todo) => {
    const todos = this.state.todos.filter(item => item.created_at !== todo.created_at)
    this.setState({todos})
  }

  render() {
    return (
      <div>
        <form onSubmit={this.addTodo}>
          <input type='text' value={this.state.text} onChange={this.inputChange}/>
          <button type='submit'>Add</button>
        </form>
        <ul>
          {
            this.state.todos.map(todo => (
              <li key={todo.created_at}>
                <span>{todo.text}</span>
                <button onClick={()=>this.delTodo(todo)}>x</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

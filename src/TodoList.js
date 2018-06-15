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

  componentDidMount() {
    firebaseDb.collection('todos')
      .where('author', '==', this.props.user.email)
      .onSnapshot(snapshot => {
        let todos = []
        snapshot.forEach(item => todos.push({id: item.id, ...item.data()}))
        this.setState({todos})
      })
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
      // .then(todoRef => {
      //   const newTodo = {
      //     id: todoRef.id,
      //     ...todo
      //   }
      //   const newTodos = this.state.todos.concat(newTodo)
      //   this.setState({todos: newTodos, text: ''})
      //   console.log(newTodo)
      // })
    this.setState({text: ''})
  }

  delTodo = (todo) => {
    // const todos = this.state.todos.filter(item => item.created_at !== todo.created_at)
    // this.setState({todos})
    firebaseDb.collection('todos')
      .doc(todo.id)
      .delete()
      // .then(()=>{
      //   const newTodos = this.state.todos.filter(item => item.id !== todo.id)
      //   this.setState({todos: newTodos})
      // })
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

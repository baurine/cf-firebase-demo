import React from 'react'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      text: '',
      todos: [
        {
          text: 'Do creative friday',
          created_at: new Date().toISOString()
        }
      ]
    }
  }

  inputChange = (e) => {
    this.setState({text: e.target.value})
  }

  addTodo = (e) => {
    e.preventDefault()
    const todo = {
      text: this.state.text,
      created_at: new Date().toISOString()
    }
    const newTodos = this.state.todos.concat(todo)
    this.setState({todos: newTodos, text: ''})
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
                <button>x</button>
              </li>
            ))
          }
        </ul>
      </div>
    )
  }
}

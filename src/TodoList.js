import React from 'react'

export default class TodoList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [
        {
          text: 'Do creative friday',
          created_at: new Date().toISOString()
        }
      ]
    }
  }

  render() {
    return (
      <div>
        <form>
          <input type='text'/>
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

import React, { PureComponent } from 'react';
import TodoList from './components/TodoList'
import Header from './components/Header'
import Footer from './components/Footer'

import './css/Todo.css'

const filterByStatus = (listTodos = [], status = '', id) => {
  switch (status) {
    case 'ACTIVE':
      return listTodos.filter(item => !item.isCompleted)
    case 'COMPLETED':
      return listTodos.filter(item => item.isCompleted)
    case 'REMOVE':
      return listTodos.filter(item => item.id !== id)
    default:
      return listTodos
  }
}

const filterTodosLeft = (listTodos = []) => {
  return listTodos.filter(item => !item.isCompleted)
}

class App extends PureComponent {
  state = {
    listTodos: [],
    isCheckedAll: false,
    status: 'ALL',
    todoEditingId: ''
  }

  addTodos = (todo = {}) => {
    this.setState(preState => ({
      listTodos: [...preState.listTodos, todo]
    }))
  }

  markCompleted = (id = '') => {
    const { listTodos } = this.state
    let isCheckedAll = true
    const updatedListTodos = listTodos.map(item => {
      if ((!item.isCompleted && item.id !== id) || (item.isCompleted && item.id === id)) {
        isCheckedAll = false
      }
      if (item.id === id) {
        return { ...item, isCompleted: !item.isCompleted }
      }
      return item
    })
    this.setState({
      isCheckedAll,
      listTodos: updatedListTodos
    })
  }

  checkAll = () => {
    const { listTodos, isCheckedAll } = this.state
    const updatedListTodos = listTodos.map(item => ({ ...item, isCompleted: !isCheckedAll }))
    this.setState(preState => ({
      isCheckedAll: !preState.isCheckedAll,
      listTodos: updatedListTodos
    }))
  }

  clearCompleted = () => {
    this.setState(preState => ({
      listTodos: filterTodosLeft(preState.listTodos)
    }))
  }

  getEditTodo = (id = '') => {
    this.setState({
      todoEditingId: id
    })
  }

  editTodo = (todo, index) => {
    const { listTodos } = this.state
    listTodos.splice(index, 1, todo)
    this.setState({ listTodos })
  }

  removeTodo = (id = '') => {
    this.setState(prevState => ({
      listTodos: filterByStatus(prevState.listTodos, 'REMOVE', id)
    }))
  }

  render() {
    const { listTodos, isCheckedAll, status, todoEditingId } = this.state
    return (
      <div className="todoapp">
        <Header
          addTodo={this.addTodos}
        />
        <TodoList
          listTodos={filterByStatus(listTodos, status)}
          markCompleted={this.markCompleted}
          checkAll={this.checkAll}
          isCheckedAll={isCheckedAll}
          todoEditingId={todoEditingId}
          getEditTodo={this.getEditTodo}
          editTodo={this.editTodo}
          removeTodo={this.removeTodo}
        />
        <Footer
          activeButton={status}
          setStatusFilter={(status) => this.setState({ status })}
          clearCompleted={this.clearCompleted}
          numOfTodosLeft={filterTodosLeft(listTodos).length}
          numOfTodos={listTodos.length}
        />
      </div>
<div class="clock">
      <div class="clock-face">
        <div class="hand hour-hand"></div>
        <div class="hand min-hand"></div>
        <div class="hand second-hand"></div>
      </div>
    </div>

<div class="timer">
    <div class="timer__controls">
      <button data-time="20" class="timer__button">20 Secs</button>
      <button data-time="300" class="timer__button">Work 5</button>
      <button data-time="900" class="timer__button">Quick 15</button>
      <button data-time="1200" class="timer__button">Snack 20</button>
      <button data-time="3600" class="timer__button">Lunch Break</button>
      <form name="customForm" id="custom">
        <input type="text" name="minutes" placeholder="Enter Minutes">
      </form>
    </div>
    <div class="display">
      <h1 class="display__time-left"></h1>
      <p class="display__end-time"></p>
    </div>
  </div>
    );

  }
}

export default App;

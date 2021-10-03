import React, { useState } from 'react'
import '../scss/all.scss'
import styled from 'styled-components';
import SetTodo from './SetTodo.js'
import TodoList from './TodoList.js'

const Main = styled.main`
  max-width: 800px;
  margin: 1rem auto 0;
`

const Title = styled.h2`
  font-weight: bolder;
  text-align: center;
`

const Todo = () => {
  const [todos, setTodo] = useState([]);

  return (
    <Main>
      <Title>To Do list</Title>
      <SetTodo data={todos} setTodo={setTodo} />
      <TodoList todos={todos} setTodo={setTodo} />
    </Main>
  )
}

const App = () => {
  return (
    <div className="App" >
      <Todo />
    </div >
  )
}

export default App;

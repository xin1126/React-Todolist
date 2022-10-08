import React, { useState } from 'react'
import '../scss/all.scss'
import styled from 'styled-components';
import SetTodo from './SetTodo'
import TodoList from './TodoList'

const Main = styled.main`
  max-width: 800px;
  margin: 1rem auto 0;
`

const Title = styled.h2`
  font-weight: bolder;
  text-align: center;
`

const Todo: React.FC = () => {
  const [todos, setTodo] = useState<Todo[]>([]);

  return (
    <Main>
      <Title>To Do list</Title>
      <SetTodo data={todos} setTodo={setTodo} />
      <TodoList todos={todos} setTodo={setTodo} />
    </Main>
  )
}

const App: React.FC = () => {
  return (
    <div className="App" >
      <Todo />
    </div >
  )
}

export default App;

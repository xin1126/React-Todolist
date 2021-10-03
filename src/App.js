import React, { Component, useState, useEffect } from 'react'
import classNames from 'classnames';
import './scss/all.scss'
import styled from 'styled-components';

const Main = styled.main`
  max-width: 800px;
  margin: 1rem auto 0;
`

const Title = styled.h2`
  font-weight: bolder;
  text-align: center;
`

const List = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const Input = styled.input`
  width: 80%;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  background-color: #fff;
  background-clip: padding-box;
  border: 1px solid #ced4da;
  appearance: none;
  border-radius: 0.25rem;
`

const Button = styled.button`
  display: inline-block;
  font-weight: 400;
  line-height: 1.5;
  color: #fff;
  background-color: ${props => props.theme.colors[props.color]};
  border-color: ${props => props.color};
  text-align: center;
  text-decoration: none;
  vertical-align: middle;
  cursor: pointer;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.375rem 0.75rem;
  font-size: 1rem;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
`

const Todo = () => {
  const [todos, setTodo] = useState([]);

  const [tempTodos, setTempTodo] = useState([]);

  const [value, setValue] = useState('');

  const addData = () => {
    setTodo([...todos, {
      id: new Date().getTime(),
      value: value,
      complete: false
    }])
    setValue('')
  }

  const inputValue = (e) => {
    setValue(e.target.value)
    console.log(e);
  }

  const onChange = (e) => {
    todos.forEach(item => {
      if (item.id === Number(e.target.getAttribute('data-id'))) {
        item.complete = e.target.checked
      }
    })
    setTodo([...todos])
  }

  const deleteData = (e) => setTodo([...todos.filter(item => item.id !== Number(e.target.getAttribute('data-id')))])

  const updateData = (e) => {
    const status = e.target.getAttribute('color')
    console.log(e.target.getAttribute('color'));
    switch (status) {
      case 'primary':
        setTempTodo([...todos])
        break;
      case 'success':
        setTempTodo([...todos.filter(item => item.complete === true)])
        break;
      case 'secondary':
        setTempTodo([...todos.filter(item => item.complete === false)])
        break;
      default:
    }
  }

  useEffect(() => {
    setTempTodo(todos)
  }, [todos]);

  return (
    <Main>
      <Title>To Do list</Title>
      <Input type="text" placeholder="請輸入代辦事項" value={value} onChange={inputValue} />
      <Button color='primary' type="button" onClick={addData}>新增</Button>
      {todos.length !== 0 &&
        <div>
          <div className="text-center">
            <Button onClick={updateData} color='primary' type="button">全部</Button>
            <Button onClick={updateData} color='success' type="button">已完成</Button>
            <Button onClick={updateData} color='secondary' type="button">未完成</Button>
          </div>
          <ul>
            {tempTodos.map(item => (
              <List key={item.id}>
                <div className={classNames({ 'text-decoration-line-through': item.complete })}>
                  <input type="checkbox" className="me-1" onChange={onChange} data-id={item.id} checked={item.complete} />
                  {item.value}
                </div>
                <Button className="ms-auto" color='danger' onClick={deleteData} data-id={item.id} type="button">刪除</Button>
              </List>
            ))}
          </ul>
        </div>
      }
    </Main>
  )
}

class App extends Component {
  render () {
    return (
      <div className="App" >
        <Todo />
      </div >
    )
  }
}

export default App;

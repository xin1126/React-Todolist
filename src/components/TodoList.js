import { useState, useEffect } from 'react'
import classNames from 'classnames';
import styled from 'styled-components';
import Button from '../style/Button.js';

const List = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

const TodoList = ({ todos, setTodo }) => {
  const [tempTodos, setTempTodo] = useState([]);

  const updateData = (e) => {
    const status = e.target.getAttribute('color')
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

  const onChange = (e) => {
    todos.forEach(item => {
      if (item.id === Number(e.target.getAttribute('data-id'))) {
        item.complete = e.target.checked
      }
    })
    setTodo([...todos])
  }

  const deleteData = (e) => setTodo([...todos.filter(item => item.id !== Number(e.target.getAttribute('data-id')))])

  useEffect(() => {
    setTempTodo(todos)
  }, [todos]);

  return (
    <>
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
    </>
  )
}

export default TodoList
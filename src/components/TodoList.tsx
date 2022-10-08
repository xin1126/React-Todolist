import { useState, useEffect } from 'react'
import classNames from 'classnames';
import styled from 'styled-components';
import Button from '../style/Button';
import React from 'react';

const List = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`

interface TodosProps {
  todos: Array<Todo>;
  setTodo: (todos: React.SetStateAction<Todo[]>) => void;
}

const TodoList: React.FC<TodosProps> = ({ todos, setTodo }) => {
  const [tempTodos, setTempTodo] = useState<Todo[]>([]);

  const updateData = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLButtonElement
    const status = el.getAttribute('color')
    switch (status) {
      case 'primary':
        setTempTodo([...todos])
        break;
      case 'success':
        setTempTodo([...todos.filter(item => item.complete)])
        break;
      case 'secondary':
        setTempTodo([...todos.filter(item => !item.complete)])
        break;
      default:
    }
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const el = e.target as HTMLInputElement
    todos.forEach(item => {
      if (String(item.id) === el.getAttribute('data-id')) {
        item.complete = el.checked
      }
    })
    setTodo([...todos])
  }

  const deleteData = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = e.target as HTMLButtonElement
    setTodo([...todos.filter(item => String(item.id) !== el.getAttribute('data-id'))])
  }

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
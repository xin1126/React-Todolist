import React from 'react';
import { useState } from 'react'
import styled from 'styled-components';
import Button from '../style/Button';

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

interface SetTodoProps {
  data: Array<Todo>;
  setTodo: (todos: React.SetStateAction<Todo[]>) => void;
}

const SetTodo: React.FC<SetTodoProps> = ({ data, setTodo }) => {
  const [value, setValue] = useState('');

  const inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }

  const addData = () => {
    setTodo([...data, {
      id: new Date().getTime(),
      value: value,
      complete: false
    }])
    setValue('')
  }

  return (
    <>
      <Input type="text" placeholder="請輸入代辦事項" value={value} onChange={inputValue} />
      <Button color='primary' type="button" onClick={addData}>新增</Button>
    </>
  )
}

export default SetTodo
import React, { Component } from 'react'
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

const InputGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
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

class App extends Component {
  state = {
    value: '',
    data: [],
    tempData: [],
  }

  inputValue = (e) => this.setState({ value: e.target.value })

  addData = () => {
    this.setState({
      data: [...this.state.data, {
        id: new Date().getTime(),
        value: this.state.value,
        complete: false
      }],
      value: ''
    }, () => {
      this.setState({
        tempData: this.state.data,
      })
    })
  }

  deleteData = (e) => this.setState({
    data: this.state.data.filter(item => item.id !== Number(e.target.getAttribute('data-id')))
  }, () => {
    this.setState({
      tempData: this.state.data,
    })
  })

  onChange = (e) => {
    const tempData = [...this.state.data]
    tempData.forEach(item => {
      if (item.id === Number(e.target.getAttribute('data-id'))) {
        item.complete = e.target.checked
      }
    })
    this.setState({
      data: tempData,
    })
  }

  updateData = (status) => {
    if (status === 'complete') {
      this.setState({
        tempData: this.state.data,
      })
    } else if (status === 'completed') {
      this.setState({
        tempData: this.state.data.filter(item => item.complete === true),
      })
    } else if (status === 'undone') {
      this.setState({
        tempData: this.state.data.filter(item => item.complete === false),
      })
    }
  }

  complete = () => this.updateData('complete')

  completed = () => this.updateData('completed')

  undone = () => this.updateData('undone')

  render () {
    return (
      <div className="App" >
        <Main>
          <Title>To Do list</Title>
          <InputGroup>
            <Input type="text" placeholder="請輸入代辦事項" value={this.state.value} onChange={this.inputValue} />
            <Button color='primary' type="button" onClick={this.addData}>新增</Button>
          </InputGroup>
          {this.state.data.length !== 0 &&
            <div>
              <div className="text-center">
                <Button onClick={this.complete} color='primary' type="button">全部</Button>
                <Button onClick={this.completed} color='success' type="button">已完成</Button>
                <Button onClick={this.undone} color='secondary' type="button">未完成</Button>
              </div>
              <ul>
                {this.state.tempData.map(item => (
                  <List key={item.id}>
                    <div className={classNames({ 'text-decoration-line-through': item.complete })}>
                      <input type="checkbox" className="me-1" onChange={this.onChange} data-id={item.id} checked={item.complete} />{item.value}
                    </div>
                    <Button className="ms-auto" color='danger' onClick={this.deleteData} data-id={item.id} type="button">刪除</Button>
                  </List>
                ))}
              </ul>
            </div>
          }
        </Main>
      </div >
    )
  }
}

export default App;

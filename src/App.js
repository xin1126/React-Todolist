import React, { Component } from 'react'
import classNames from 'classnames';
import './scss/all.scss'

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
      <div className="App">
        <main className="container mt-5">
          <h2 className="fw-bold text-center">To Do list</h2>
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="請輸入代辦事項" value={this.state.value} onChange={this.inputValue} />
            <button className="btn btn-primary" type="button" id="button-addon2" onClick={this.addData}>新增</button>
          </div>
          {this.state.data.length !== 0 &&
            <div>
              <div className="text-center">
                <button onClick={this.complete} className="btn btn-primary me-2">全部</button>
                <button onClick={this.completed} className="btn btn-success me-2">已完成</button>
                <button onClick={this.undone} className="btn btn-secondary">未完成</button>
              </div>
              <ul>
                {this.state.tempData.map(item => (
                  <li className="d-flex align-items-center mb-3" key={item.id}>
                    <div className={classNames({ 'text-decoration-line-through': item.complete })}>
                      <input type="checkbox" className="me-1" onChange={this.onChange} data-id={item.id} checked={item.complete} />{item.value}
                    </div>
                    <button className="btn btn-danger ms-auto" onClick={this.deleteData} data-id={item.id}>刪除</button>
                  </li>
                ))}
              </ul>
            </div>
          }
        </main>
      </div >
    )
  }
}

export default App;

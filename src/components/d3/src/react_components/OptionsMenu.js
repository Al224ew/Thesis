import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown'
import StateHandler from '../handlers/StateHandler'
import OptionsConnector from '../component-task-connectors/OptionsConnector'
export default class OptionsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      top: '0px',
      left: '0px',
      options: []
    }
  }

  componentDidMount () {
    StateHandler.addState('contextmenu', 'default', (d3Event) => {
      this.setState({
        show: true,
        top: d3Event.clientY,
        left: d3Event.clientX
      })
      StateHandler.stateChange('click', 'contextmenu')
    })
    StateHandler.addState('click', 'contextmenu', (d3Event) => this.setState({
      show: false,
      top: d3Event.clientY,
      left: d3Event.clientX
    }))

    OptionsConnector.setUpdateStateFunc((data) => this.setState({ options: data }))
  }

  onClickHandler (option) {
    option.func()
    this.setState({ show: false })
  }

  render () {
    return (
      <div style={{ position: 'absolute', top: '0px', left: '0px' }}>
        {this.state.show &&
          <Dropdown style={{ backgroundColor: '#F2F3F4', position: 'absolute', left: this.state.left, top: this.state.top }}>
            {this.state.options.map((option, index) => {
              return <Dropdown.Item key={index} onClick={() => this.onClickHandler(option)}> {option.name} </Dropdown.Item>
            })}
          </Dropdown>}
      </div>
    )
  }
}

import React from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import StateHandler from '../tasks/helper/StateHandler'
export default class OptionsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      top: '0px',
      left: '0px'
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
  }

  render () {
    return (
      <div style={{ position: 'absolute', top: '0px', left: '0px' }}>
        {this.state.show &&
          <ListGroup style={{ position: 'absolute', left: this.state.left, top: this.state.top }}>
            <ListGroup.Item><b>Toggle AreaSelection (ctrl+s)</b></ListGroup.Item>
            <ListGroup.Item>Find adjacent nodes (ctrl+n)</ListGroup.Item>
          </ListGroup>}
      </div>
    )
  }
}

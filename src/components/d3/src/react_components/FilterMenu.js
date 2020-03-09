import React from 'react'
import Modal from 'react-bootstrap/Modal'
import Dropdown from 'react-bootstrap/Dropdown'
import FilterHandler from '../component-task-connectors/FilterConnector'
import Button from 'react-bootstrap/Button'

export default class OptionsMenu extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      show: false,
      top: '0px',
      left: '0px',
      options: [],
      filters: []
    }
  }

  componentDidMount () {
    FilterHandler.setShowFunc(() => this.setShow())
  }

  setShow () {
    this.setState({ show: true, filters: [] })
  }

  dropDownConditionRender (index) {
    const less = '<'
    const valueType = this.state.filters[index].valueType
    if (valueType === 'starts with' || valueType === 'contains') return '-'
    return (
      <Dropdown>
        <Dropdown.Toggle variant='Secondary'>{this.state.filters[index].condition}</Dropdown.Toggle>
        <Dropdown.Menu style={{ width: '10px' }}>
          <Dropdown.Item eventKey='1' onClick={() => this.setCondition(index, '>')}>></Dropdown.Item>
          <Dropdown.Item eventKey='2' onClick={() => this.setCondition(index, '<')}>{less}</Dropdown.Item>
          <Dropdown.Item eventKey='3' onClick={() => this.setCondition(index, '=')}>=</Dropdown.Item>
          <Dropdown.Item eventKey='2' onClick={() => this.setCondition(index, '≥')}>≥</Dropdown.Item>
          <Dropdown.Item eventKey='3' onClick={() => this.setCondition(index, '≤')}>≤</Dropdown.Item>
          <Dropdown.Item eventKey='3' onClick={() => this.setCondition(index, '!=')}>!=</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
  }

  setValueType (index, newType) {
    const o = this.state.filters
    o[index].valueType = newType
    this.setState({ filters: o })
  }

  setCondition (index, newCondition) {
    const o = this.state.filters
    o[index].condition = newCondition
    this.setState({ filters: o })
  }

  dropDownValueTypeRender (index, type) {
    if (type === 'string') {
      return (
        <Dropdown>
          <Dropdown.Toggle variant='Secondary'>{this.state.filters[index].valueType}</Dropdown.Toggle>
          <Dropdown.Menu style={{ width: '10px' }}>
            <Dropdown.Item eventKey='1' onClick={() => this.setValueType(index, 'length')}>Length</Dropdown.Item>
            <Dropdown.Item eventKey='2' onClick={() => this.setValueType(index, 'starts with')}>Starts with</Dropdown.Item>
            <Dropdown.Item eventKey='3' onClick={() => this.setValueType(index, 'value')}>Value</Dropdown.Item>
            <Dropdown.Item eventKey='3' onClick={() => this.setValueType(index, 'contains')}>Contains</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      )
    } else {
      return 'Number Value'
    }
  }

  textChange (event, index) {
    const o = this.state.filters
    o[index].value = event.target.value
    this.setState({ filters: o })
  }

  renderFilter (type, index) {
    return (
      <tr style={{ borderStyle: 'solid', borderColor: 'black', borderRadius: 2, borderWidth: 0.5 }}>
        <td style={{ borderStyle: 'solid', borderColor: 'black', borderRadius: 2, borderWidth: 0.5 }}>{type.name}
        </td>
        <td style={{ borderStyle: 'solid', borderColor: 'black', borderRadius: 2, borderWidth: 0.5 }}>{type.typeof}
        </td>
        <td style={{ borderStyle: 'solid', borderColor: 'black', borderRadius: 2, borderWidth: 0.5 }}>
          {this.dropDownValueTypeRender(index, type.typeof)}
        </td>
        <td style={{ borderStyle: 'solid', borderColor: 'black', borderRadius: 2, borderWidth: 0.5 }}>
          {this.dropDownConditionRender(index)}
        </td>
        <td style={{ borderStyle: 'solid', borderColor: 'black', borderRadius: 2, borderWidth: 0.5 }}>
          <input style={{ width: '100%' }} type='text' name='name' value={this.state.filters[index].value} onChange={(event) => this.textChange(event, index)} />
        </td>

      </tr>
    )
  }

  addNewFilter (type) {
    const o = this.state.filters
    if (type.typeof === 'string') {
      type.valueType = 'length'
    } else {
      type.valueType = 'value'
    }
    type.condition = '>'
    type.value = ''
    o.push(type)
    this.setState({ filters: o })
  }

  render () {
    return (
      <div style={{ position: 'absolute', top: '0px', left: '0px' }}>
        <Modal show={this.state.show} onHide={() => this.setState({ show: false })} centered>
          <Modal.Header closeButton>
            <Modal.Title>Filter current selection.</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please chose the attribute below you would like to filter the selection by.
            <Dropdown>
              <table style={{ width: '100%', textAlign: 'center' }}>
                <tr>
                  <td style={{ width: '50%' }}>
                    <u>Node Attributes</u>
                    <Dropdown.Item eventKey='1' onClick={() => this.addNewFilter({ name: 'age', typeof: 'number' })}>Age</Dropdown.Item>
                    <Dropdown.Item eventKey='2' onClick={() => this.addNewFilter({ name: 'name', typeof: 'string' })}>SometShit</Dropdown.Item>
                  </td>
                  <td style={{ width: '50%' }}>
                    <u>Edge Attributes</u>
                    <Dropdown.Item eventKey='1' onClick={() => this.addNewFilter({ name: 'age', typeof: 'number' })}>Friends</Dropdown.Item>
                    <Dropdown.Item eventKey='2' onClick={() => this.addNewFilter({ name: 'name', typeof: 'string' })}>he</Dropdown.Item>
                  </td>
                </tr>
              </table>
            </Dropdown>
            <hr />
            Selected filter conditions
            <table style={{ textAlign: 'center', width: '100%' }}>
              <tr>
                <th>Attribute
                </th>
                <th>Type
                </th>
                <th>
                      Value Type
                </th>
                <th>
                      Condition
                </th>
                <th>
                      Value
                </th>
              </tr>
              {this.state.filters.map((each, index) => this.renderFilter(each, index))}
            </table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant='secondary' onClick={() => NaN}>
            Close
            </Button>
            <Button variant='primary' onClick={() => NaN}>
            Apply filter
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

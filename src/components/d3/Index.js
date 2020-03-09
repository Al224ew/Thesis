import React from 'react'
import dataHandler from '../Data/DataHandler'
import Graph from './src/Graph'
import SelectionDataHandler from './src/component-task-connectors/SelectionDataHandler'
import OptionsMenu from './src/react_components/OptionsMenu'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import FilterMenu from './src/react_components/FilterMenu'
export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.d3Ref = React.createRef()
    this.data = dataHandler.data
    this.state = { showAttributes: true, attributes: [], option: { show: true, left: '776px', top: '385px' } }
  }

  componentDidMount () {
    // Making the attributes show up on the page.
    SelectionDataHandler.init((selection) => { this.setState({ attributes: selection }) })
    this.graph = new Graph(this.d3Ref.current)
    this.graph.generate()
    this.graph.applyForce()
    setTimeout(() => {
      this.setState({ option: { show: true, left: '776px', top: '200px' } })
    }, 2000)
  }

  // Bullshit code.. Remove and fix.
  print (e) {
    const string = []
    for (const [key, value] of Object.entries(e)) {
      if (key === 'index') break
      string.push(<b>{key}</b>, <i>{value}</i>)
    }
    return string
  }

  render () {
    return (
      <div>
        <div style={{ width: '100vw', height: '100vh' }} ref={this.d3Ref} />
        <div style={{textAlign: 'center', position: 'absolute', top: '0px', left: '40%', width:'10%', height: '3%', borderStyle:'solid', borderTopStyle:'none', borderRadius: '8px', borderWidth: '1px', backgroundColor: 'white'}}>
          <p> Current mode: Panning</p>
        </div>
        {this.state.showAttributes &&
          <div style={{ backgroundColor: 'white', borderRadius: 2, borderStyle: 'solid', borderWidth: 0.5, borderColor: 'black', height: '100vh', position: 'absolute', top: '0px', left: '0px', width: '20vw' }}>
            <Tabs defaultActiveKey='home' id='uncontrolled-tab-example'>
              <Tab eventKey='home' title='Selection Data'>
                {this.state.attributes.length > 0
                  ? this.state.attributes.map(e => <p style={{ width: '100%', wordWrap: 'break-word' }} key={e.data()[0].id}>{this.print(e.data()[0])}</p>)
                  : <p>Currently no entity selected. </p>}
              </Tab>
              <Tab eventKey='profile' title='Filters'>
                <h1>h</h1>
              </Tab>
              <Tab eventKey='contact' title='Options'>
                <h2>h2</h2>
              </Tab>
            </Tabs>

          </div>}
        <FilterMenu />
        <OptionsMenu />
      </div>
    )
  }
}

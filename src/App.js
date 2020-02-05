import React from 'react'
import Index from './components/d3/Index'
import NodeGeneratorCard from './components/Options/NodeGeneratorCard'
import fakeData from './components/fakeData/nodeLinks'
export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { nodes: -1 }
  }

  fake (nodes) {
    fakeData.generate(nodes)
    this.setState({ nodes: nodes })
  }

  render () {
    return (
      <div>
        {this.state.nodes > 0
          ? <Index />
          : <NodeGeneratorCard nodes={(nodes) => this.fake(nodes)} />}
      </div>
    )
  }
}

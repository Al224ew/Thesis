import React from 'react'
import Index from './components/d3/Index'
import NodeGeneratorCard from './components/Options/NodeGeneratorCard'
export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { renderGraph: false }
  }

  render () {
    return (
      <div>
        {this.state.renderGraph
          ? <Index />
          : <NodeGeneratorCard state={(state) => this.setState({ renderGraph: state })} />}
      </div>
    )
  }
}

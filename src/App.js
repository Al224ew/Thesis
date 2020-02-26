import React from 'react'
import Index from './components/d3/Index'
import NodeGeneratorCard from './components/Options/NodeGeneratorCard'
import LeapHandler from './components/LeapMotion/LeapHandler'
export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = { renderGraph: false, text: '' }
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
/**
 *         {this.state.renderGraph
          ? <Index />
          : <NodeGeneratorCard state={(state) => this.setState({ renderGraph: state })} />}
 */

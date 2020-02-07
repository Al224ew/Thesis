import React from 'react'
import dataHandler from '../Data/dataHandler'
import Graph from './src/Graph'
export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.d3Ref = React.createRef()
    this.data = dataHandler.data
    this.state = { height: window.innerHeight, width: window.innerWidth }
  }

  componentDidMount () {
    this.graph = new Graph(this.d3Ref.current, this.data)
    this.graph.generate()
    this.graph.applyForce()
  }

  render () {
    return (
      <div style={{ width: '100vw', height: '100vh' }} ref={this.d3Ref} />
    )
  }
}

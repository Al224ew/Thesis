import React from 'react'
import fakeData from '../fakeData/nodeLinks'
import Graph from './src/Graph'
export default class Index extends React.Component {
  constructor (props) {
    super(props)
    this.d3Ref = React.createRef()
    this.data = fakeData.data
    this.state = { height: window.innerHeight, width: window.innerWidth }
  }

  componentDidMount () {
    const graph = new Graph(this.d3Ref.current, this.data)
    graph.generate()
    graph.applyForce()
  }

  render () {
    return (
      <div style={{ width: '100vw', height: '100vh' }} ref={this.d3Ref} />
    )
  }
}

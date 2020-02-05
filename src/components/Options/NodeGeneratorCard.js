import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
/**
 * A basic card which is used to specifiy the amount of nodes for the newly generated network.
 * @param {} props - Only props we need is the props.nodes, which is setting the amount of nodes and generating data inside the app.js
 */
export default function NodeGeneratorCard (props) {
  const [nodes, setNodes] = useState(0)

  const inputHandle = (e) => {
    if (!isNaN(Number(e.target.value))) {
      setNodes(Number(e.target.value))
    }
  }
  return (
    <Card style={{ height: '55vh', width: '18rem', marginLeft: 'auto', marginRight: 'auto', top: '22vh' }}>
      <Card.Img variant='top' src='https://datavizproject.com/wp-content/uploads/2016/06/DVP_101_200-35.png' />
      <Card.Body style={{ textAlign: 'center' }}>
        <Card.Title>Welcome to graphy</Card.Title>
        <Card.Text>
      Please enter the amount of nodes you would like to generate below. Then press generate graph to generate the graph.
        </Card.Text>
        <input type='text' name='name' value={nodes} onChange={inputHandle} />
        <br />
        <Button style={{ marginTop: '2px' }} variant='primary' onClick={() => props.nodes(nodes)}>Generate Graph!</Button>
      </Card.Body>
    </Card>
  )
}

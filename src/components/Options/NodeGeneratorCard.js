import React, { useState } from 'react'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import DataHandler from '../Data/DataHandler'
import Spinner from 'react-bootstrap/Spinner'
/**
 * A basic card which is used to specifiy the amount of nodes for the newly generated network.
 * @param {} props - Only props we need is the props.state, which is telling App.js if it should render the graph or not.
 */
export default function MainCard (props) {
  const [nodes, setNodes] = useState(0)
  const [file, setFile] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setLoading] = useState(false)
  //
  const inputHandle = (e) => {
    if (!isNaN(Number(e.target.value))) {
      setNodes(Number(e.target.value))
    }
  }
  /**
   * This function will generate a graph depending on the input.
   * If a file is chosen then it uses the *dataHandler to handle the data and set it to it's properValue.
   * Otherwise it calls *dataHandler to generate data with the number of nodes specified.
   * Any error will be shown inside the card.
   */
  const generateGraph = () => {
    setLoading(true)
    if (file != null) {
      DataHandler.dataFromFile(file).then(() => props.state(true))
        .catch(err => handleError(err))
    } else {
      if (nodes > 0) {
        DataHandler.generate(nodes)
        props.state(true)
      } else {
        handleError('Cannot start with 0 nodes')
      }
    }
  }

  const handleError = (err) => {
    setError(err)
    setLoading(false)
  }

  return (
    <Card style={{ height: '60vh', width: '18rem', marginLeft: 'auto', marginRight: 'auto', top: '20vh' }}>
      <Card.Img variant='top' src='https://datavizproject.com/wp-content/uploads/2016/06/DVP_101_200-35.png' />
      <Card.Body style={{ textAlign: 'center' }}>
        <Card.Title>Welcome to graphy</Card.Title>
        <Card.Text>
      Please enter the amount of nodes you would like to generate below or chose a json file containing your graph. Then press generate graph to generate the graph.

        </Card.Text>
        {isLoading
          ? <Spinner animation='border' />
          : <div>{error !== '' && <p style={{ color: 'red' }}>({error}) <br /> Please try again.</p>}
            <input type='text' name='name' value={nodes} onChange={inputHandle} />
            <input type='file' id='fileInput' accept='.json' onChange={(e) => setFile(e.target.files[0])} />
            <br />
            <Button style={{ marginTop: '2px' }} variant='primary' onClick={() => generateGraph()}>Generate Graph!</Button>
            </div>}
      </Card.Body>
    </Card>
  )
}

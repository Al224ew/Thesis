// Every mouseEvent will be sent a d3 event.
import * as d3 from 'd3'
import StateHandler from '../handlers/StateHandler'

const MouseEvents = {
  initEvents (ref) {
    const firstChild = d3.select(ref.firstChild)
    firstChild.on('wheel', () => StateHandler.functionFromState('wheel')(d3.event))

    firstChild.on('mousedown', (e) => {
      firstChild.on('mousemove', () => StateHandler.functionFromState('mousemove')(d3.event))
    })

    firstChild.on('mouseup', (e) => {
      StateHandler.functionFromState('mouseup')(d3.event)
      firstChild.on('mousemove', null)
      StateHandler.revertDefaultState('mousemove')
      StateHandler.revertDefaultState('mouseup')
    })
    // Showing only the menu options.
    firstChild.on('contextmenu', () => {
      StateHandler.functionFromState('contextmenu')(d3.event)
      d3.event.preventDefault()
    })
    firstChild.on('click', () => {
      StateHandler.functionFromState('click')(d3.event)
      StateHandler.revertDefaultState('click')
    })
    this.initD3MouseEvents()
  },
  initD3MouseEvents () {
    d3.selectAll('circle').on('click', (e) => {
      StateHandler.functionFromState('nodeClick')(d3.select(d3.event.target))
    })
    d3.selectAll('line').on('click', (e) => {
      StateHandler.functionFromState('edgeClick')(d3.select(d3.event.target))
    })
  }
}
export default MouseEvents

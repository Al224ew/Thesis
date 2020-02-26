
import KeyEvents from './tasks/helper/KeyEvents'
import Navigation from './tasks/Navigation'
import EntitySelector from './tasks/EntitySelector'
import MouseEvents from './tasks/helper/MouseEvents'
import AreaSelection from './tasks/AreaSelection'
import MiscTasks from './tasks/MiscTasks'

export default class Tasks {
  constructor (node, links, ref, svg) {
    this.deselectionClicks = 0
    this.ref = ref
    this.svg = svg
    KeyEvents.initEvents(() => EntitySelector.previousSelection())
    MouseEvents.initEvents(this.ref)
    Navigation.init(this.svg)
    AreaSelection.init(this.svg)
    EntitySelector.init(node, links)
    MiscTasks.init()
  }

  findAdjacent (nodeId) {
    console.log(this.links)
    const neighbours = []
    const edges = []
    this.links.forEach((index, link) => {
      if (link.source === nodeId || link.target === nodeId) {
        neighbours.push(nodeId === link.target ? link.source.id : link.target.id)
        edges.push(index)
      }
    })
  }
}

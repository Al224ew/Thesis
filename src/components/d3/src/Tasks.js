
import KeyEvents from './events/KeyEvents'
import Navigation from './tasks/Navigation'
import EntitySelector from './tasks/EntitySelector'
import MouseEvents from './events/MouseEvents'
import AreaSelection from './tasks/AreaSelection'
import MiscTasks from './tasks/MiscTasks'

export default class Tasks {
  constructor (node, links, ref, svg) {
    this.deselectionClicks = 0
    KeyEvents.initEvents(() => EntitySelector.previousSelection())
    MouseEvents.initEvents(ref)
    Navigation.init(svg)
    AreaSelection.init(svg)
    EntitySelector.init(node, links)
    MiscTasks.init()
  }
}

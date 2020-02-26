
import StateHandler from './helper/StateHandler'
const Navigation = {
  /// Variable area
  currentZoom: 1,
  movement: { x: 0, y: 0 },
  svg: null,
  setG (e) { this.gSelect = e },
  //
  /**
   * Initiates all events regarding navigation.
   * Takes a SVG element which should be affected on move etc.
   * Initiates different states upon statehandler regarding mousemove and wheel.
   */
  init (svg) {
    this.svg = svg
    StateHandler.addState('mouseMove', 'moveSvg', (d3Event) => this.moveSvg(d3Event))
    StateHandler.addState('wheel', 'zoomSvg', (d3Event) => this.zoomSvg(d3Event))
    StateHandler.setDefaultState('mouseMove', 'moveSvg')
    StateHandler.setDefaultState('wheel', 'zoomSvg')
    StateHandler.revertDefaultState('wheel')
    StateHandler.revertDefaultState('mouseMove')
  },

  /**
   * If in = false, we zoom out.
   * If in = true, we zoom in.
   */
  zoomSvg (d3Event) {
    if (d3Event.deltaY > 0) {
      this.currentZoom -= this.currentZoom > 0.3 ? 0.2 : 0
    } else {
      this.currentZoom += this.currentZoom < 1.6 ? 0.2 : 0
    }
    this.svg.attr('transform', 'translate(' + this.movement.x + ' ' + this.movement.y + ') scale(' + this.currentZoom + ' ' + this.currentZoom + ')')
  },

  /**
  *
  * @param {*} svg - The svg element which should be affected
  * @param {*} direction - Is it moving left or right? Up or down. (negative or positive x/y values.)
  */
  moveSvg (d3Event) {
    this.movement.x += d3Event.movementX
    this.movement.y += d3Event.movementY
    this.svg.attr('transform', 'translate(' + this.movement.x + ' ' + this.movement.y + ') scale(' + this.currentZoom + ' ' + this.currentZoom + ')')
  }
}
export default Navigation

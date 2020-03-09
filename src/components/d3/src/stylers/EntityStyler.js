const EntityStyler = {
  /**
     * Styles a node or edge to look highlighted.
     * @param {*} entity - Node or edge that should be highlighted.
     */
  hightLight (type, entity) {
    if (entity.length < 1) { return }
    if (type === 'nodes') {
      entity
        //
        .style('fill', 'yellow')
        .style('opacity', 1)
        .style('stroke-width', '2')
    } else if (type === 'edges') {
      entity
        .style('stroke', 'black')
        .style('stroke-width', '5')
    }
  },

  /**
       * Styles a node or edge to look normalized
       * @param {*} entity - Node or edge that should be normalized.
       */
  normalize (type, entity) {
    if (entity.length < 1) { return }
    if (type === 'nodes') {
      entity
        .attr('r', 20)
        .style('fill', '#69b3a2')
        .style('opacity', 0.8)
        .style('stroke-width', '0')
    } else if (type === 'edges') {
      entity
        .style('stroke', '#aaa')
        .style('stroke-width', '2')
    }
  },

  polySetPoints (poly, points) {
    poly.attr('points', points)
  }
}

export default EntityStyler

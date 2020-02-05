const fakeData = {
  data: {
  },
  generate: function (nodes) {
    const data = { nodes: [], links: [] }
    console.log(nodes)
    for (let i = 0; i <= nodes; i++) {
      data.nodes.push({ id: i })
    }
    for (let i = 0; i <= nodes; i++) {
      data.links.push({ source: i, target: Math.round(Math.random() * nodes) })
    }
    fakeData.data = data
  }
}
export default fakeData

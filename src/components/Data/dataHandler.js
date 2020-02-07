const dataHandler = {
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
    dataHandler.data = data
    console.log(JSON.stringify(data))
  },
  /**
   * Will return a promise upon completion of extracting data from given file and setting it the the graphs data.
   * Accepts JSON.
   * @param {*} file - The file which should be parsed.
   */
  dataFromFile: function (file) {
    return new Promise((resolve, reject) => {
      try {
        switch (file.type) {
          case 'application/json':
            file.text()
              .then(data => JSON.parse(data))
              .then(parsedData => {
                resolve(dataHandler.data = parsedData)
              })
            break

          default:
            reject('Unsupported data type')
        }
      } catch (err) {
        reject('Error while parsing data')
      }
    })
  }
}
export default dataHandler

import {set} from 'd3-collection'

const margin = 10

export default class Layer {
  constructor (graph, id) {
    this.id = id
    this.graph = graph
    this.nodes = set()
  }
  add (nodeId) {
    this.nodes.add(nodeId)
  }
  render (root) {
    let cumY = 0
    this.nodes.each((nodeId) => {
      let node = this.graph.clusterNodes.get(nodeId)
      let g = root.append('g')
      node.render(g)
      let box = g.node().getBBox()
      g.attr('transform', `translate(0, ${cumY})`)
      cumY += box.height + margin
    })
  }
}
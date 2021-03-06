import {event} from 'd3-selection'
import {GraphNode, addressHeight, addressWidth} from './graphNode.js'
import contextMenu from 'd3-context-menu'

const padding = 10
export default class AddressNode extends GraphNode {
  constructor (dispatcher, address, layerId, labelType, colors, currency) {
    super(dispatcher, labelType, address, layerId, colors, currency)
    // absolute coords for linking, not meant for rendering of the node itself
    this.x = 0
    this.y = 0
    this.type = 'address'
  }
  render (root) {
    if (root) this.root = root
    if (!this.root) throw new Error('root not defined')
    if (this.shouldUpdate(true)) {
      this.root.node().innerHTML = ''
      let x = 0
      let y = 0
      let g = this.root
        .append('g')
        .classed('addressNode', true)
        .on('click', () => {
          event.stopPropagation()
          this.dispatcher('selectNode', ['address', this.id])
        })
        .on('contextmenu', contextMenu(this.menu()))
        .on('mouseover', () => this.dispatcher('tooltip', 'address'))
        .on('mouseout', () => this.dispatcher('hideTooltip'))
      g.append('rect')
        .classed('addressNodeRect', true)
        .attr('x', x)
        .attr('y', y)
        .attr('width', addressWidth)
        .attr('height', addressHeight)

      let h = y + addressHeight / 2 + this.labelHeight / 3
      let label = g.append('g')
        .classed('label', true)
        .attr('transform', `translate(${x + padding}, ${h})`)

      this.renderLabel(label)
      let eg = g.append('g')
      this.renderExpand(eg, true)
      this.renderExpand(eg, false)
      this.coloring()
      this.renderSelected()
    } else {
      if (this.shouldUpdate('label')) {
        let label = this.root.select('g.label')
        this.renderLabel(label)
        this.coloring()
      }
      if (this.shouldUpdate('select')) {
        this.renderSelected()
      }
    }
    super.render()
  }
  getHeight () {
    return addressHeight
  }
  getWidth () {
    return addressWidth
  }
  getId () {
    return this.data.address
  }
}

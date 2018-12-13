import menuLayout from './config/menu.html'
import notes from './config/notes.html'
import Component from './component.js'

const menuWidth = 250
const menuHeight = 300

export default class Menu extends Component {
  constructor (dispatcher) {
    super()
    this.dispatcher = dispatcher
  }
  showNodeConfig (x, y, node) {
    this.setMenuPosition(x, y)
    this.view = node.data.type
    this.node = node
    this.shouldUpdate(true)
  }
  setMenuPosition (x, y) {
    let w = window
    let d = document
    let e = d.documentElement
    let g = d.getElementsByTagName('body')[0]
    let width = w.innerWidth || e.clientWidth || g.clientWidth
    let height = w.innerHeight || e.clientHeight || g.clientHeight
    if (x + menuWidth > width) x -= menuWidth
    if (y + menuHeight > height) y -= menuWidth
    this.menuX = x
    this.menuY = y
  }
  hideMenu () {
    this.view = null
    this.shouldUpdate(true)
  }
  render (root) {
    console.log('render menu')
    if (root) this.root = root
    if (!this.root) throw new Error('root not defined')
    if (!this.shouldUpdate()) return this.root
    if (!this.view) {
      this.root.innerHTML = ''
      super.render()
      return
    }
    this.root.innerHTML = menuLayout
    let menu = this.root.querySelector('#menu-frame')
    menu.addEventListener('click', (e) => {
      this.dispatcher('hideContextmenu')
    })
    menu.addEventListener('contextmenu', (e) => {
      e.stopPropagation()
      e.preventDefault()
      return false
    })
    let box = this.root.querySelector('#menu-box')
    box.style.left = this.menuX + 'px'
    box.style.top = this.menuY + 'px'
    box.addEventListener('click', (e) => {
      e.stopPropagation()
    })
    let el = this.root.querySelector('#config')
    let title = 'Notes'
    el.innerHTML = notes
    this.setupNotes(el)
    this.root.querySelector('.title').innerHTML = title
    super.render()
    return this.root
  }
  setupNotes (el) {
    let input = el.querySelector('textarea')
    input.value = this.node.data.notes || ''
    input.addEventListener('input', (e) => {
      console.log('input', e.target.value)
      this.dispatcher('inputNotes', {id: this.node.data.id, type: this.node.data.type, note: e.target.value})
    })
  }
}
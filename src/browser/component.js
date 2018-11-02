import {replace} from '../template_utils'
import option from './option.html'

export default class BrowserComponent {
  constructor (dispatcher, index) {
    this.index = index
    this.dispatcher = dispatcher
    this.root = document.createElement('div')
    this.root.className = 'browser-component'
  }
  renderOptions () {
    let ul = document.createElement('ul')
    ul.className = 'list-reset'
    this.options.forEach((optionData) => {
      let li = document.createElement('li')
      li.className = 'cursor-pointer py-1'
      li.innerHTML = replace(option, optionData)
      li.addEventListener('click', () => {
        this.dispatcher.call(optionData.message, null, this.requestData())
      })
      ul.appendChild(li)
    })
    return ul
  }
  destroy () {
  }
}
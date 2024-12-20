import diff from "./diff"

export default class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
    const virtualDOM = this.render()
    const oldDOM = this.getDOM()
    // 容器
    const container = oldDOM.parentNode
    diff(virtualDOM, container, oldDOM)
  }

  setDOM(dom) { 
    this._dom = dom
  }

  getDOM(dom) {
    return this._dom
  }
}
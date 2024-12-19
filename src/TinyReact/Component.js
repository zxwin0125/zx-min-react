import diff from "./diff"

export default class Component {
  constructor(props) {
    this.props = props
  }

  setState(state) {
    this.state = Object.assign({}, this.state, state)
    const virtualDOM = this.render()
    const oldDOM = this.getDOM()

    diff(virtualDOM, oldDOM.parentNode, oldDOM)
  }

  setDOM(dom) {
    this._dom = dom
  }

  getDOM(dom) {
    return this._dom
  }
}
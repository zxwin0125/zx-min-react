export default function unmountNode(node) {
	const virtualDOM = node._virtualDOM
	// 1. 文本节点直接删除
if (virtualDOM.props.type === 'text') {
	node.remove();
	return
}
// 2. 节点是否是组件生成
const component = virtualDOM.component
if (component) {
	component.componentWillUnmount()
}
	// 3. ref
	if (virtualDOM.props && virtualDOM.props.ref) {
		virtualDOM.props.ref(null)
	}
	// 4. 事件
	Object.keys(virtualDOM.props).forEach(propName => {
		if (propName.startsWith('on')) {
      const eventName = propName.toLowerCase().slice(0, 2)
      const eventHandler = virtualDOM.props[propName]
      node.removeEventListener(eventName, eventHandler)
    }
	})
	// 5. 子节点
	if (node.childNodes.length > 0) {
    for (let i = 0; i < node.childNodes.length; i++) {
      unmountNode(node.childNodes[i])
      i--
    }
  }

	// 删除节点
	node.remove();
}

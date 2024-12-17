export default function updateNodeElement(newElement, virtualDOM) {
	// 获取节点对应的属性对象
	const newProps = virtualDOM.props;
	Object.keys(newProps).forEach(propName => {
		// 获取属性值
		const newPropsValue = newProps[propName];
		// 判断属性
		// 事件属性
		if (propName.slice(0, 2) === 'on') {
			// 事件名称
			const eventName = propName.toLowerCase().slice(2);
			// 给元素添加事件
			newElement.addEventListener(eventName, newPropsValue);
		} else if (propName === 'value' || propName === 'checked') {
      // 属性
			newElement[propName] = newPropsValue;
		} else if (propName !== 'children') {
			if (propName === 'className') {
        // 样式
				newElement.setAttribute('class', newPropsValue);
			} else {
				newElement.setAttribute(propName, newPropsValue);
			}
		}
	});
}

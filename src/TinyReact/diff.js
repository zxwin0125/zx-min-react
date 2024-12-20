import createDOMElement from './createDOMElement';
import diffComponent from './diffComponent';
import mountElement from './mountElement';
import unmountNode from './unmountNode';
import updateNodeElement from './updateNodeElement';
import updateTextNode from './updateTextNode';

export default function diff(virtualDOM, container, oldDOM) {
	const oldVirtualDOM = oldDOM && oldDOM._virtualDOM;
	const oldComponent = oldVirtualDOM && oldVirtualDOM.component;
	// 判断是否存在 oldDOM
	if (!oldDOM) {
		// 如果不存在 不需要对比 直接将 Virtual DOM 转换为真实 DOM
		mountElement(virtualDOM, container);
	} else if (
		virtualDOM.type !== oldVirtualDOM.type &&
		typeof virtualDOM.type !== 'function'
	) {
		const newElement = createDOMElement(virtualDOM);
		oldDOM.parentNode.replaceChild(newElement, oldDOM);
	} else if (typeof virtualDOM.type === 'function') {
		diffComponent(virtualDOM, oldComponent, oldDOM, container);
	} else if (oldVirtualDOM && virtualDOM.type === oldVirtualDOM.type) {
		if (virtualDOM.type === 'text') {
			// 更新文本
			updateTextNode(virtualDOM, oldVirtualDOM, oldDOM);
		} else {
			// 更新元素
			updateNodeElement(oldDOM, virtualDOM, oldVirtualDOM);
		}

		// 1. 将拥有key属性的子元素放置在一个单独的对象中
		let keyedElements = {};
		for (let i = 0, len = oldDOM.childNodes.length; i < len; i++) {
			const domElement = oldDOM.childNodes[i];
			if (domElement.nodeType === 1) {
				let key = domElement.getAttribute('key');
				if (key) {
					keyedElements[key] = domElement;
				}
			}
		}

		const hasNokey = Object.keys(keyedElements).length === 0;

		if (hasNokey) {
			// 对比子节点
			virtualDOM.children.forEach((child, i) => {
				diff(child, oldDOM, oldDOM.childNodes[i]);
			});
		} else {
			// 2. 循环 virtualDOM 的子元 素 获取子元素的 key 属性
			virtualDOM.children.forEach((child, i) => {
				let key = child.props.key;
				if (key) {
					let domElement = keyedElements[key];
					if (domElement) {
						// 3. 看看当前位置的元素是不是我们期望的元素
						if (oldDOM.childNodes[i] && oldDOM.childNodes[i] !== domElement) {
							oldDOM.insertBefore(domElement, oldDOM.childNodes[i]);
						}
					} else {
						mountElement(child, oldDOM, oldDOM.childNodes[i])
					}
				}
			});
		}

		// 删除节点
		const oldChildNodes = oldDOM.childNodes;
		if (oldChildNodes.length > virtualDOM.children.length) {
			for (
				let i = oldChildNodes.length - 1;
				i > virtualDOM.children.length - 1;
				i--
			) {
				unmountNode(oldChildNodes[i]);
			}
		}
	}
}

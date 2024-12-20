import createDOMElement from './createDOMElement';
import unmountNode from './unmountNode';

export default function mountNativeElement(virtualDOM, container, oldDOM) {
	const newElement = createDOMElement(virtualDOM);
	if (oldDOM) {
		unmountNode(oldDOM);
	}

	// 将转换后的 DOM 对象放置在页面中
	container.appendChild(newElement);

	const component = virtualDOM.component;

	if (component) {
		component.setDOM(newElement);
	}
}

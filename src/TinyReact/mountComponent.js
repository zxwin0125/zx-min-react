import isFunction from './isFunction';
import isFunctionComponent from './isFunctionComponent';
import mountNativeElement from './mountNativeElement';

export default function mountComponent(virtualDOM, container, oldDOM) {
	let nextVirtualDOM = null;
	// 判断是函数组件还是类组件
	if (isFunctionComponent(virtualDOM)) {
		// 函数组件
		nextVirtualDOM = buildFunctionComponent(virtualDOM);
	} else {
		// 类组件
		nextVirtualDOM = buildClassComponent(virtualDOM);
	}

	if (isFunction(nextVirtualDOM)) {
		// Component
		mountComponent(nextVirtualDOM, container, oldDOM);
	} else {
		// Native Element
		mountNativeElement(nextVirtualDOM, container, oldDOM);
	}
}

function buildFunctionComponent(virtualDOM) {
	return virtualDOM.type(virtualDOM.props || {});
}

function buildClassComponent(virtualDOM) {
	// 实例化组件
	const component = new virtualDOM.type(virtualDOM.props || {});
	const nextVirtualDOM = component.render();
	nextVirtualDOM.component = component;
	return nextVirtualDOM;
}

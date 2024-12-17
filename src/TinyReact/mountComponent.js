import isFunction from './isFunction';
import isFunctionComponent from './isFunctionComponent';
import mountNativeElement from './mountNativeElement';

export default function mountComponent(virtualDOM, container) {
	let nextVirtualDOM = null;
	// 判断是函数组件还是类组件
	if (isFunctionComponent(virtualDOM)) {
		nextVirtualDOM = buildFunctionComponent(virtualDOM);
	}

	if (isFunction(nextVirtualDOM)) {
		// Component
		mountComponent(nextVirtualDOM, container);
	} else {
		// Native Element
		mountNativeElement(nextVirtualDOM, container);
	}
}

function buildFunctionComponent(virtualDOM) {
	return virtualDOM.type();
}

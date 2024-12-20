import isFunction from './isFunction';
import mountNativeElement from './mountNativeElement';
import mountComponent from './mountComponent';

export default function mountElement(virtualDOM, container, oldDOM) {
	if (isFunction(virtualDOM)) {
		// Component
		mountComponent(virtualDOM, container, oldDOM);
	} else {
		// Native Element
		mountNativeElement(virtualDOM, container, oldDOM);
	}
}

import isFunction from './isFunction';
import mountNativeElement from './mountNativeElement';
import mountComponent from './mountComponent';

export default function mountElement(virtualDOM, container) {
	if (isFunction(virtualDOM)) {
		// Component
		mountComponent(virtualDOM, container);
	} else {
		// Native Element
		mountNativeElement(virtualDOM, container);
	}
}

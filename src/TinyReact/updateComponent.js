import diff from './diff';

export default function updateComponent(
	virtualDOM,
	oldComponent,
	oldDOM,
	container
) {
	oldComponent.componentWillReceiveProps(virtualDOM.props);
	if (oldComponent.shouldComponentUpdate(virtualDOM.props)) {
		// 未更新前 props
		const prevProps = oldComponent.props;
		oldComponent.componentWillUpdate(virtualDOM.props);
		// 组件更新
		oldComponent.updateProps(virtualDOM.props);
		const nextVirtualDOM = oldComponent.render();
		nextVirtualDOM.component = oldComponent;
		diff(nextVirtualDOM, container, oldDOM);
		oldComponent.componentDidUpdate(prevProps);
	}
}

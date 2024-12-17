import createDOMElement from "./createDOMElement";

export default function mountNativeElement(virtualDOM, container) {
  let newElement = createDOMElement(virtualDOM);

  // 将转换后的 DOM 对象放置在页面中
  container.appendChild(newElement);
}
import mountElement from "./mountElement"

export default function diff(virtualDOM, container, oldDOM) {
  // 判断是否存在 oldDOM
  if (!oldDOM) {
    // 如果不存在 不需要对比 直接将 Virtual DOM 转换为真实 DOM
    mountElement(virtualDOM, container)
  }
}
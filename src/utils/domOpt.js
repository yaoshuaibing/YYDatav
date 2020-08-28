// dom 操作相关的 api

// 获取盒模型的位置和宽高信息
export function getRect(dom) {
  return dom.getBoundingClientRect()
}
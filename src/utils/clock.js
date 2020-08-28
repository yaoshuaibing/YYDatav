// 封装动画和时钟
// 时钟
class Clock {
  constructor() {
    this.start = new Date().getTime()
    this.end = this.start
  }

  getDateDur () {
    this.end = new Date().getTime()
    return this.end - this.start
  }
  updateStart () {
    return this.start = new Date().getTime()
  }
}

export function animation (callback, timeDur, immediately = false) {
  const clock = new Clock()
  const requestAnimationFrame = window.requestAnimationFrame
  let cancelAnimation = null
  let stop = false
  const animationFun = () => {
    if (clock.getDateDur() >= timeDur) {
      callback()
      clock.updateStart()
    }
    if (!stop) {
      cancelAnimation = requestAnimationFrame(animationFun)
    }
  }
  if (immediately) {
    callback() // 立即执行一次动画函数
  }
  cancelAnimation = requestAnimationFrame(animationFun)

  // 返回出去一个动画取消函数
  return () => {
    stop = true
    window.cancelAnimationFrame(cancelAnimation)
  }
}
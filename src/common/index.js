/**
 * Defer 渲染帧优化
 * @param { Number } maxFrameCount
 * @returns Boolean
 */
export function useDefer(maxFrameCount = 1000) {
  let frameCount = 0
  const refreshFrameCount = () => {
    requestAnimationFrame(() => {
      frameCount++
      if (frameCount < maxFrameCount) {
        refreshFrameCount()
      }
    })
  }
  refreshFrameCount()
  return function (showInFrameCount) {
    return frameCount >= showInFrameCount
  }
}

/**
 * 时间判断
 */
const time1 = " 11:30:00",
  time2 = " 13:30:00",
  time3 = " 18:00:00"
export function getTimeToWelcome() {
  if (new Date(new Date().toLocaleDateString() + time1) > Date.now()) {
    return "上午好"
  } else if (
    new Date(new Date().toLocaleDateString() + time1) <= Date.now() &&
    new Date(new Date().toLocaleDateString() + time2) > Date.now()
  ) {
    return "中午好"
  } else if (
    new Date(new Date().toLocaleDateString() + time2) <= Date.now() &&
    new Date(new Date().toLocaleDateString() + time3) > Date.now()
  ) {
    return "下午好"
  }
  return "晚上好"
}

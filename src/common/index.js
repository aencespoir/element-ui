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

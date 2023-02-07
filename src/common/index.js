export function useDefer(maxFrameCount = 1000) {
  const refreshFrameCount = () => {
    requestAnimationFrame(() => {
      frameCount.value++
      if (frameCount.value < maxFrameCount) {
        refreshFrameCount()
      }
    })
  }
  refreshFrameCount()
  return function (showInFrameCount) {
    return frameCount.value >= showInFrameCount
  }
}
export function generateMockBars(count = 60, start = Date.now() - 1000 * 60 * 60 * 24 * 30) {
  const bars: any[] = []
  let ts = start
  // start price
  let price = 9235.28
  for (let i = 0; i < count; i++) {
    // make hourly bars
    ts += 1000 * 60 * 60 // 1 hour
    const open = price
    // random walk
    const change = (Math.random() - 0.4) * 60 // bias small upwards
    const close = Math.max(1, +(open + change).toFixed(2))
    const high = Math.max(open, close) + +(Math.random() * 30).toFixed(2)
    const low = Math.min(open, close) - +(Math.random() * 30).toFixed(2)
    const volume = Math.round(Math.random() * 3000)
    bars.push({ timestamp: ts, open, high, low, close, volume })
    price = close
  }
  return bars
}

export const sampleBars = generateMockBars(80)

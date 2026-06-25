import { useEffect, useMemo, useRef, useState } from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import { WebView } from 'react-native-webview'

const { width } = Dimensions.get('window')

export interface KLineWebProps {
  width?: number
  height?: number
  bars?: any[]
}

export default function KLineWeb({ width: w = width, height = 360, bars }: KLineWebProps) {
  const webRef = useRef<any>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (!ready || !webRef.current) return
    try {
      // send host size first so web can size canvas accurately
      webRef.current.postMessage(JSON.stringify({ type: 'setSize', w: Math.floor(w), h: Math.floor(height) }))
    } catch (err) {}
    if (bars) {
      try {
        webRef.current.postMessage(JSON.stringify({ type: 'setBars', bars }))
      } catch (err) {}
    }
  }, [ready, bars])
  const html = useMemo(() => {
    // Fallback: draw a simple candlestick chart on canvas (no external scripts)
    const bars = [
      { timestamp: 1651603200000, open: 9235.28, high: 9250.0, low: 9200.0, close: 9220.0, volume: 1200 },
      { timestamp: 1651689600000, open: 9220.0, high: 9240.0, low: 9100.0, close: 9126.49, volume: 2000 },
      { timestamp: 1651776000000, open: 9126.49, high: 9160.0, low: 9000.0, close: 9126.49, volume: 1500 },
      { timestamp: 1651862400000, open: 9126.49, high: 9200.0, low: 9100.0, close: 9187.03, volume: 1800 },
      { timestamp: 1651948800000, open: 9187.03, high: 9235.28, low: 9150.0, close: 9208.08, volume: 1100 },
    ]

    return `
      <!doctype html>
      <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html,body,#container{margin:0;padding:0;height:100%;background:#0f1115;color:#fff}
          #chart{width:100%;height:100%;display:flex;align-items:center;justify-content:center}
          canvas{width:100%;height:100%;}
        </style>
      </head>
      <body>
        <div id="container"><canvas id="canvas"></canvas></div>
        <script>
          (function(){
            // forward console and errors to RN for debugging
            var _origLog = console.log.bind(console)
            console.log = function(){
              try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({type:'console', args: Array.from(arguments)})) }catch(e){}
              _origLog.apply(console, arguments)
            }
            window.onerror = function(msg, src, line, col, err){
              try{ window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'error', msg, src, line, col, stack: err && err.stack })) }catch(e){}
            }

                            const canvas = document.getElementById('canvas')
            const ctx = canvas.getContext('2d')
            let dpr = window.devicePixelRatio || 1
                            canvas.style.display = 'block'
            function resize(){
                console.log(window.innerWidth)
              // prefer host-provided size when available
              const wHost = (typeof HOST_W !== 'undefined' && HOST_W) ? HOST_W : Math.max(320, Math.floor(window.innerWidth || 320))
              const hHost = (typeof HOST_H !== 'undefined' && HOST_H) ? HOST_H : Math.max(200, Math.floor(window.innerHeight || 200))
              const w = wHost
              const h = hHost
              canvas.style.width = w + 'px'
              canvas.style.height = h + 'px'
              canvas.width = Math.floor(w * dpr)
              canvas.height = Math.floor(h * dpr)
              ctx.setTransform(dpr,0,0,dpr,0,0)
              console.log('web resize', { w, h, dpr })
            }
            function computeMA(bars, period){
              const res = []
              for(let i=0;i<bars.length;i++){
                if(i < period-1){ res.push(null); continue }
                let sum = 0
                for(let j = i-period+1; j<=i; j++) sum += bars[j].close
                res.push(sum/period)
              }
              return res
            }

            function draw(bars){
              if(!bars || bars.length===0) return
              resize()
              const w = canvas.clientWidth
              const h = canvas.clientHeight
              ctx.clearRect(0,0,w,h)
                            // layout (reduced margins to better fill container)
                            const margin = {left:8,right:12,top:12,bottom:36}
                            const volHeight = Math.floor(h * 0.16)
                            const chartH = h - margin.top - margin.bottom - volHeight
              const areaW = w - margin.left - margin.right
              // find min/max for price area
              let min = Infinity, max = -Infinity
              bars.forEach(b=>{ min = Math.min(min, b.low); max = Math.max(max, b.high) })
              const pad = (max - min) * 0.05
              max += pad; min -= pad
              const priceToY = v => margin.top + chartH * (1 - (v - min) / (max - min || 1))

              // grid
              ctx.strokeStyle = 'rgba(255,255,255,0.04)'
              ctx.lineWidth = 1
              const gridLines = 4
              for(let i=0;i<=gridLines;i++){
                const y = margin.top + (chartH) * (i / gridLines)
                ctx.beginPath()
                ctx.moveTo(margin.left, y)
                ctx.lineTo(margin.left + areaW, y)
                ctx.stroke()
              }

              const barSlot = areaW / bars.length
              const barW = Math.max(4, Math.floor(barSlot * 0.6))

              // candles
              for(let i=0;i<bars.length;i++){
                const b = bars[i]
                const x = margin.left + (i + 0.5) * barSlot
                const yOpen = priceToY(b.open)
                const yClose = priceToY(b.close)
                const yHigh = priceToY(b.high)
                const yLow = priceToY(b.low)
                const up = b.close >= b.open
                const colorFill = up ? '#3ecf8e' : '#ef6b6b'
                const wickColor = colorFill
                // wick
                ctx.strokeStyle = wickColor
                ctx.lineWidth = 1
                ctx.beginPath()
                ctx.moveTo(x, yHigh)
                ctx.lineTo(x, yLow)
                ctx.stroke()
                // body
                const by = Math.min(yOpen, yClose)
                const bh = Math.max(1, Math.abs(yClose - yOpen))
                ctx.fillStyle = colorFill
                ctx.fillRect(x - barW/2, by, barW, bh)
              }

              // moving averages
              const ma5 = computeMA(bars, 5)
              const ma10 = computeMA(bars, 10)
              const ma30 = computeMA(bars, 30)
              function drawMA(maArr, color){
                ctx.strokeStyle = color
                ctx.lineWidth = 1.5
                ctx.beginPath()
                let started = false
                for(let i=0;i<maArr.length;i++){
                  const v = maArr[i]
                  if(v == null) { started = false; continue }
                  const x = margin.left + (i + 0.5) * barSlot
                  const y = priceToY(v)
                  if(!started){ ctx.moveTo(x,y); started = true } else ctx.lineTo(x,y)
                }
                ctx.stroke()
              }
              drawMA(ma5, '#f1c40f')
              drawMA(ma10, '#1abc9c')
              drawMA(ma30, '#9b59b6')

              // draw price labels on right (right-aligned to avoid overflow)
              ctx.fillStyle = '#9aa0a6'
              ctx.font = '12px sans-serif'
              // nudge price labels slightly to the right but clamp inside canvas
              const desiredPriceX = margin.left + areaW - 2
              const priceLabelX = Math.min(Math.max(margin.left, desiredPriceX), w - 4)
              const prevTextAlign = ctx.textAlign
              ctx.textAlign = 'right'
              for(let i=0;i<=gridLines;i++){
                const y = margin.top + (chartH) * (i / gridLines)
                const price = (max - (max - min) * (i / gridLines)).toFixed(2)
                ctx.fillText(price, priceLabelX, y + 4)
              }
              ctx.textAlign = prevTextAlign

              // draw current price dashed line
              const last = bars[bars.length-1]
              const lastY = priceToY(last.close)
              ctx.strokeStyle = 'rgba(255,255,255,0.12)'
              ctx.setLineDash([4,4])
              ctx.beginPath()
              ctx.moveTo(margin.left, lastY)
              ctx.lineTo(margin.left + areaW, lastY)
              ctx.stroke()
              ctx.setLineDash([])
              // current price label (ensure it stays inside canvas)
              const curLabelW = 56
              // nudge current price box a few px to the right but keep inside canvas
              const desiredCurX = margin.left + areaW - curLabelW + 6
              const curLabelX = Math.min(Math.max(margin.left, desiredCurX), w - curLabelW - 2)
              ctx.fillStyle = '#ffffff'
              ctx.fillRect(curLabelX, lastY - 10, curLabelW, 20)
              ctx.fillStyle = '#0f1115'
              const prevAlign2 = ctx.textAlign
              ctx.textAlign = 'center'
              ctx.fillText(last.close.toFixed(2), curLabelX + curLabelW/2, lastY + 6)
              ctx.textAlign = prevAlign2

              // draw MA labels top-left
              ctx.font = '11px sans-serif'
              ctx.fillStyle = '#f1c40f'
              const ma5v = ma5[ma5.length-1]
              if(ma5v!=null) ctx.fillText('MA5:' + ma5v.toFixed(2), margin.left, 16)
              ctx.fillStyle = '#1abc9c'
              const ma10v = ma10[ma10.length-1]
              if(ma10v!=null) ctx.fillText('MA10:' + ma10v.toFixed(2), margin.left + 90, 16)
              ctx.fillStyle = '#9b59b6'
              const ma30v = ma30[ma30.length-1]
              if(ma30v!=null) ctx.fillText('MA30:' + ma30v.toFixed(2), margin.left + 180, 16)

              // volume bars
              const volTop = margin.top + chartH + 12
              const volAreaH = volHeight - 8
              // find max vol
              let maxVol = 0
              bars.forEach(b => { if(b.volume > maxVol) maxVol = b.volume })
              for(let i=0;i<bars.length;i++){
                const b = bars[i]
                const x = margin.left + (i + 0.5) * barSlot
                const volH = Math.max(1, (b.volume / (maxVol || 1)) * volAreaH)
                const color = b.close >= b.open ? 'rgba(62,207,142,0.9)' : 'rgba(239,107,107,0.9)'
                ctx.fillStyle = color
                ctx.fillRect(x - barW/2, volTop + (volAreaH - volH), barW, volH)
              }

              // volume axis label
              ctx.fillStyle = '#9aa0a6'
              ctx.font = '11px sans-serif'
              ctx.fillText('VOL', margin.left, volTop + volAreaH + 14)
            }

            // initial draw and message handling
            const initBars = ${JSON.stringify(bars)}
            function doInitial(){ try{ resize(); draw(initBars); console.log('draw initial', initBars.length) }catch(e){ console.log('draw initial err', e) } }
            if(document.readyState === 'complete') doInitial(); else window.addEventListener('load', doInitial)

            window.addEventListener('message', function(e){
              try{
                const msg = JSON.parse(e.data)
                if(msg && msg.type === 'setBars' && Array.isArray(msg.bars)){
                  try{ resize(); draw(msg.bars); console.log('draw setBars', msg.bars.length) }catch(e){ console.log('draw setBars err', e) }
                }
                if(msg && msg.type === 'requestBars'){
                  window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'requestBars' }))
                }
              }catch(err){ console.log('web message parse err', err) }
            })

            setTimeout(function(){ window.ReactNativeWebView && window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'init', ready: true })) }, 200)
            window.addEventListener('resize', function(){ try{ resize(); draw(initBars) }catch(e){ console.log('resize draw err', e) } })
          })()
        </script>
      </body>
      </html>
    `
  }, [])

  return (
    <View style={[styles.container, { width: w, height }]}> 
      <WebView
        ref={webRef}
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1, backgroundColor: 'transparent' }}
        javaScriptEnabled
        domStorageEnabled
        onMessage={(e) => {
          try {
            const data = JSON.parse(e.nativeEvent.data)
            console.log('KLineWeb message', data)
            if(data && data.type === 'init'){
              setReady(true)
            }
            if(data && data.type === 'requestBars'){
              // forward request to host (optionally implement fetching)
              if(webRef.current && bars){
                try{ webRef.current.postMessage(JSON.stringify({ type: 'setBars', bars })) }catch(err){}
              }
            }
          } catch (err) { console.log('KLineWeb onMessage parse error', err) }
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    alignSelf: 'stretch'
  }
})

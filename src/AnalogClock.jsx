import React, { useEffect, useState } from 'react'
import './App.css'

function AnalogClock() {
  const [now, setNow] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(timer)
  }, [])

  const seconds = now.getSeconds()
  const minutes = now.getMinutes()
  const hours = now.getHours()

  const secondDeg = seconds * 6
  const minuteDeg = (minutes + seconds / 60) * 6
  const hourDeg = ((hours % 12) + minutes / 60 + seconds / 3600) * 30

  const ticks = Array.from({ length: 60 }, (_, i) => i)
  const numbers = Array.from({ length: 12 }, (_, i) => i + 1)

  return (
    <div className="clock-wrapper">
      <div className="clock">
        <div className="dial">
          <div className="ticks">
            {ticks.map((i) => {
              const angle = i * 6
              const isHour = i % 5 === 0
              return (
                <div
                  key={i}
                  className={isHour ? 'tick hour-tick' : 'tick minute-tick'}
                  style={{ transform: `translate(-50%,-100%) rotate(${angle}deg)` }}
                />
              )
            })}
          </div>

          <div className="numbers">
            {numbers.map((n, idx) => {
              const angle = (idx + 1) * 30
              const transform = `rotate(${angle}deg) translateY(-86px) translateX(-50%) translateY(-50%)`
              return (
                <div key={n} className="number" style={{ transform }}>
                  <span style={{ transform: `translate(-50%,-50%) rotate(-${angle}deg)` }}>{n}</span>
                </div>
              )
            })}
          </div>

          <div
            className="hand hour"
            style={{ transform: `translate(-50%,-100%) rotate(${hourDeg}deg)` }}
          />
          <div
            className="hand minute"
            style={{ transform: `translate(-50%,-100%) rotate(${minuteDeg}deg)` }}
          />
          <div
            className="hand second"
            style={{ transform: `translate(-50%,-100%) rotate(${secondDeg}deg)` }}
          />
          <div className="center-dot" />
        </div>
      </div>
    </div>
  )
}

export default AnalogClock

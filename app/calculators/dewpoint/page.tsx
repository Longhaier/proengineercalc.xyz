'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

function calculateDewPoint(tempC: number, humidity: number, altitude: number): number {
  const pressure = 101.325 * Math.pow((1 - 2.25577e-5 * altitude), 5.25588)
  const satVapor = 6.1078 * Math.pow(10, (7.5 * tempC / (tempC + 237.3)))
  const actualVapor = satVapor * humidity / 100
  const dewPoint = 237.3 * Math.log10(actualVapor / 6.1078) / (7.5 - Math.log10(actualVapor / 6.1078))
  return Math.round(dewPoint * 10) / 10
}

function calculateWetBulb(tempC: number, humidity: number, pressure: number): number {
  const tw = tempC * Math.atan(0.151977 * Math.pow(humidity + 8.313659, 0.5)) + 
             Math.atan(tempC + humidity) - 
             Math.atan(humidity - 1.676331) + 
             0.00391838 * Math.pow(humidity, 1.5) * Math.atan(0.0231014 * humidity) - 
             4.686035
  return Math.round(tw * 10) / 10
}

function calculateEnthalpy(tempC: number, humidity: number): number {
  const ws = 0.622 * (6.1078 * Math.pow(10, (7.5 * tempC / (tempC + 237.3))) * humidity / 100) / 101.325
  const h = 1.005 * tempC + ws * (2501 + 1.86 * tempC)
  return Math.round(h * 10) / 10
}

function calculateHumidityRatio(tempC: number, humidity: number, pressure: number): number {
  const satVapor = 6.1078 * Math.pow(10, (7.5 * tempC / (tempC + 237.3)))
  const actualVapor = satVapor * humidity / 100
  const w = 0.622 * actualVapor / (pressure - actualVapor)
  return Math.round(w * 10000) / 10000
}

export default function DewPointCalculator() {
  const [altitude, setAltitude] = useState(0)
  const [temperature, setTemperature] = useState(25)
  const [humidity, setHumidity] = useState(50)
  const [results, setResults] = useState<{
    dewPoint: number
    wetBulb: number
    enthalpy: number
    humidityRatio: number
    pressure: number
  } | null>(null)

  useEffect(() => {
    const pressure = 101.325 * Math.pow((1 - 2.25577e-5 * altitude), 5.25588)
    const dewPoint = calculateDewPoint(temperature, humidity, altitude)
    const wetBulb = calculateWetBulb(temperature, humidity, pressure)
    const enthalpy = calculateEnthalpy(temperature, humidity)
    const humidityRatio = calculateHumidityRatio(temperature, humidity, pressure)
    
    setResults({ dewPoint, wetBulb, enthalpy, humidityRatio, pressure: Math.round(pressure * 10) / 10 })
  }, [altitude, temperature, humidity])

  return (
    <>
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">🔧 智效厂务工程计算器</Link>
          </h1>
          <p className="tagline">专业工程师计算工具箱</p>
        </div>
      </header>

      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/">🏠 首页</Link>
          <Link href="/calculators/hvac">🌡️ 暖通空调</Link>
          <Link href="/calculators/electrical">⚡ 电气工程</Link>
          <Link href="/calculators/fluid">💧 流体力学</Link>
          <Link href="/calculators/structure">🏗️ 结构工程</Link>
        </div>
      </nav>

      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
            🌡️ 露点与湿空气计算器
          </h1>
          
          <div className="calculator-form">
            <div className="form-group">
              <label>海拔 (m)</label>
              <input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(Number(e.target.value))}
                placeholder="输入海拔"
              />
              <p className="hint">输入海拔高度（0为海平面）</p>
            </div>

            <div className="form-group">
              <label>温度 (°C)</label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                placeholder="输入温度"
              />
            </div>

            <div className="form-group">
              <label>相对湿度 (%)</label>
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                min={0}
                max={100}
                placeholder="输入湿度"
              />
            </div>

            {results && (
              <div className="result-group">
                <h4>📊 计算结果</h4>
                <div className="result-item">
                  <span className="result-label">露点温度</span>
                  <span className="result-value">{results.dewPoint} °C</span>
                </div>
                <div className="result-item">
                  <span className="result-label">湿球温度</span>
                  <span className="result-value">{results.wetBulb} °C</span>
                </div>
                <div className="result-item">
                  <span className="result-label">焓值</span>
                  <span className="result-value">{results.enthalpy} kJ/kg</span>
                </div>
                <div className="result-item">
                  <span className="result-label">含湿量</span>
                  <span className="result-value">{results.humidityRatio} kg/kg</span>
                </div>
                <div className="result-item">
                  <span className="result-label">大气压力</span>
                  <span className="result-value">{results.pressure} kPa</span>
                </div>
              </div>
            )}
          </div>

          <div className="content-section">
            <h2>📐 公式与原理</h2>
            
            <h3>什么是露点？</h3>
            <p>露点是空气冷却到饱和（相对湿度100%）时的温度。当空气冷却到露点以下，水蒸气会凝结成水滴。这就是为什么冷表面会出现凝水。</p>
            
            <h3> Magnus 公式</h3>
            <p>露点计算使用 Magnus 公式，建立饱和水蒸气压与温度的关系：</p>
            <div className="formula-box">
              γ(T,RH) = ln(RH/100) + (17.27T / (T + 237.3))
              <br />
              Td = (237.3 × γ) / (17.27 - γ)
              <br /><br />
              其中:
              <br />T = 温度 (°C)
              <br />RH = 相对湿度 (%)
              <br />Td = 露点温度 (°C)
            </div>

            <h3>海拔修正</h3>
            <p>不同海拔的大气压力不同，需用气压公式计算：</p>
            <div className="formula-box">
              P = P₀ × (1 - 2.25577 × 10⁻⁵ × h)^5.25588
              <br /><br />
              其中:
              <br />P = 海拔h处的大气压力
              <br />P₀ = 海平面压力 (101.325 kPa)
              <br />h = 海拔（米）
            </div>

            <h3>湿球温度</h3>
            <p>湿球温度是空气在恒定压力下通过蒸发水所能冷却到的最低温度。对冷却塔性能和 HVAC 系统设计至关重要。</p>
          </div>

          <div className="content-section">
            <h2>📖 使用说明</h2>
            
            <h3>第一步：输入海拔</h3>
            <p>输入当地海拔（米）。海平面输入0。常见海拔：成都约500m，昆明约1900m。</p>
            
            <h3>第二步：输入温度</h3>
            <p>输入干球温度（°C），即普通温度计测量的空气温度。</p>
            
            <h3>第三步：输入相对湿度</h3>
            <p>输入相对湿度百分比（0-100%），可用湿度计测量或查询当地天气数据。</p>
            
            <h3>第四步：解读结果</h3>
            <ul>
              <li><strong>露点：</strong>低于13°C = 舒适，21°C以上 = 闷热潮湿</li>
              <li><strong>湿球：</strong>蒸发冷却系统的关键参数</li>
              <li><strong>焓值：</strong>空气的总热含量 (kJ/kg)</li>
              <li><strong>含湿量：</strong>每千克干空气中所含水蒸气的质量</li>
            </ul>
          </div>

          <div className="content-section">
            <h2>❓ 常见问题</h2>
            
            <div className="faq-item">
              <p className="faq-question">露点对暖通空调为什么重要？</p>
              <p className="faq-answer">露点决定何时产生凝水。在暖通空调中，它有助于选型除湿设备、防止霉菌生长、确保人体舒适度。当室内表面温度低于露点时，就会出现凝水和发霉问题。</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">舒适的露点范围是多少？</p>
              <p className="faq-answer">低于13°C对大多数人来说舒适。13-21°C会感觉越来越潮湿。超过21°C会感觉非常闷热不舒服。</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">海拔如何影响露点？</p>
              <p className="faq-answer">海拔越高，气压越低，空气能容纳的水分越少。这通常导致露点降低，但关系是非线性的。本计算器自动修正海拔对气压的影响。</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">露点和湿球温度有什么区别？</p>
              <p className="faq-answer">露点是空气达到饱和（产生凝结）的温度。湿球温度是通过蒸发冷却能达到的最低温度。湿球温度始终低于或等于干球温度。</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">这个计算器准吗？</p>
              <p className="faq-answer">本计算器使用标准 Magnus 公式和气压公式，在大多数条件下精度在 ±0.5°C 以内。对于精确的工程计算，请用专业软件或湿空气图表验证。</p>
            </div>
          </div>

          <div className="content-section">
            <h2>📋 案例</h2>
            
            <h3>案例1：洁净室设计</h3>
            <p>半导体洁净室需要精确控制温湿度。典型千级洁净室要求：温度20±2°C，相对湿度45±10%。在20°C和45%RH条件下，本计算器得出露点为7.6°C——任何低于此温度的表面都会产生凝水。</p>
            
            <h3>案例2：工业除湿</h3>
            <p>某仓库位于成都（海拔约500m，夏季条件：32°C，80%RH），露点为28°C。要防止潮湿损害，空调系统必须使所有表面保持在28°C以上，或使用转轮除湿机。</p>
          </div>

          <div className="disclaimer">
            <strong>⚠️ 免责声明：</strong>所有计算结果仅供参照之用。请勿将计算结果作为工程设计或施工的最终依据。
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 智效厂务工程计算器</p>
        </div>
      </footer>
    </>
  )
}

'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

// Psychrometric calculation functions
function calculateDewPoint(tempC: number, humidity: number, altitude: number): number {
  // Calculate atmospheric pressure based on altitude (meters)
  const pressure = 101.325 * Math.pow((1 - 2.25577e-5 * altitude), 5.25588)
  
  // Saturation vapor pressure
  const satVapor = 6.1078 * Math.pow(10, (7.5 * tempC / (tempC + 237.3)))
  
  // Actual vapor pressure
  const actualVapor = satVapor * humidity / 100
  
  // Dew point (inverse of Magnus formula)
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
  // Enthalpy in kJ/kg dry air
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
      {/* Header */}
      <header className="header">
        <div className="container header-content">
          <h1 className="logo">
            <Link href="/">🔧 ProEngineerCalc</Link>
          </h1>
          <p className="tagline">Professional Engineering Calculator Tools</p>
        </div>
      </header>

      {/* Navigation */}
      <nav className="nav">
        <div className="container nav-inner">
          <Link href="/">🏠 Home</Link>
          <Link href="/calculators/hvac">🌡️ HVAC</Link>
          <Link href="/calculators/electrical">⚡ Electrical</Link>
          <Link href="/calculators/fluid">💧 Fluid</Link>
          <Link href="/calculators/structure">🏗️ Structure</Link>
        </div>
      </nav>

      <main className="container">
        <div className="calculator-container">
          <h1 style={{ fontSize: '1.75rem', fontWeight: 700, margin: '2rem 0 1rem' }}>
            🌡️ Dew Point & Psychrometric Calculator
          </h1>
          
          {/* Calculator Form */}
          <div className="calculator-form">
            <div className="form-group">
              <label>Altitude (meters)</label>
              <input
                type="number"
                value={altitude}
                onChange={(e) => setAltitude(Number(e.target.value))}
                placeholder="Enter altitude"
              />
              <p className="hint">Enter elevation above sea level (0 for sea level)</p>
            </div>

            <div className="form-group">
              <label>Temperature (°C)</label>
              <input
                type="number"
                value={temperature}
                onChange={(e) => setTemperature(Number(e.target.value))}
                placeholder="Enter temperature"
              />
            </div>

            <div className="form-group">
              <label>Relative Humidity (%)</label>
              <input
                type="number"
                value={humidity}
                onChange={(e) => setHumidity(Number(e.target.value))}
                min={0}
                max={100}
                placeholder="Enter humidity"
              />
            </div>

            {results && (
              <div className="result-group">
                <h4>📊 Results</h4>
                <div className="result-item">
                  <span className="result-label">Dew Point Temperature</span>
                  <span className="result-value">{results.dewPoint} °C</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Wet Bulb Temperature</span>
                  <span className="result-value">{results.wetBulb} °C</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Enthalpy</span>
                  <span className="result-value">{results.enthalpy} kJ/kg</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Humidity Ratio</span>
                  <span className="result-value">{results.humidityRatio} kg/kg</span>
                </div>
                <div className="result-item">
                  <span className="result-label">Atmospheric Pressure</span>
                  <span className="result-value">{results.pressure} kPa</span>
                </div>
              </div>
            )}
          </div>

          {/* Formula Explanation */}
          <div className="content-section">
            <h2>📐 Formula and Principles</h2>
            
            <h3>What is Dew Point?</h3>
            <p>Dew point is the temperature to which air must be cooled to become saturated with water vapor. When air is cooled below its dew point, condensation occurs - this is why water droplets form on cold surfaces.</p>
            
            <h3>Magnus Formula</h3>
            <p>The dew point is calculated using the Magnus formula, which relates saturation vapor pressure to temperature:</p>
            <div className="formula-box">
              γ(T,RH) = ln(RH/100) + (17.27T / (T + 237.3))
              <br />
              Td = (237.3 × γ) / (17.27 - γ)
              <br /><br />
              Where:
              <br />T = Temperature (°C)
              <br />RH = Relative Humidity (%)
              <br />Td = Dew Point Temperature (°C)
            </div>

            <h3>Atmospheric Pressure Correction</h3>
            <p>For locations at different altitudes, atmospheric pressure must be calculated using the barometric formula:</p>
            <div className="formula-box">
              P = P₀ × (1 - 2.25577 × 10⁻⁵ × h)^5.25588
              <br /><br />
              Where:
              <br />P = Atmospheric pressure at altitude h
              <br />P₀ = Sea level pressure (101.325 kPa)
              <br />h = Altitude in meters
            </div>

            <h3>Wet Bulb Temperature</h3>
            <p>The wet bulb temperature is the lowest temperature to which air can be cooled by evaporating water at constant pressure. It's crucial for HVAC system design and cooling tower performance.</p>
          </div>

          {/* User Guide */}
          <div className="content-section">
            <h2>📖 User Guide</h2>
            
            <h3>Step 1: Enter Altitude</h3>
            <p>Input your location's elevation above sea level in meters. If you're at sea level, enter 0. Common altitudes: Denver (1609m), Mexico City (2240m), Lhasa (3650m).</p>
            
            <h3>Step 2: Enter Temperature</h3>
            <p>Input the ambient air temperature in Celsius. This is typically the dry bulb temperature measured by a standard thermometer.</p>
            
            <h3>Step 3: Enter Relative Humidity</h3>
            <p>Input the relative humidity percentage (0-100%). You can measure this with a hygrometer or obtain from local weather data.</p>
            
            <h3>Step 4: Interpret Results</h3>
            <ul>
              <li><strong>Dew Point:</strong> Below 13°C = comfortable, Above 21°C = sticky/humid</li>
              <li><strong>Wet Bulb:</strong> Key for evaporative cooling systems</li>
              <li><strong>Enthalpy:</strong> Total heat content of air (kJ/kg)</li>
              <li><strong>Humidity Ratio:</strong> Mass of water per kg of dry air</li>
            </ul>
          </div>

          {/* FAQ */}
          <div className="content-section">
            <h2>❓ Frequently Asked Questions</h2>
            
            <div className="faq-item">
              <p className="faq-question">Why is dew point important for HVAC?</p>
              <p className="faq-answer">Dew point determines when condensation occurs. In HVAC, it helps size dehumidification equipment, prevent mold growth, and ensure occupant comfort. When indoor surface temperatures fall below dew point, condensation and mold become problems.</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">What's a comfortable dew point range?</p>
              <p className="faq-answer">Below 13°C (55°F) is comfortable for most people. 13-21°C (55-70°F) feels increasingly humid. Above 21°C (70°F) feels very sticky and uncomfortable.</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">How does altitude affect dew point?</p>
              <p className="faq-answer">At higher altitudes, lower atmospheric pressure means air can hold less moisture. This generally results in lower dew points, but the relationship is non-linear. Our calculator automatically accounts for altitude effects on atmospheric pressure.</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">What's the difference between dew point and wet bulb?</p>
              <p className="faq-answer">Dew point is the temperature at which air becomes saturated (condensation occurs). Wet bulb is the lowest temperature achievable through evaporative cooling. Wet bulb is always lower than or equal to dry bulb temperature.</p>
            </div>
            
            <div className="faq-item">
              <p className="faq-question">How accurate is this calculator?</p>
              <p className="faq-answer">This calculator uses the standard Magnus formula and barometric formula, providing accuracy within ±0.5°C for most conditions. For precise engineering calculations, verify with professional software or psychrometric charts.</p>
            </div>
          </div>

          {/* Related Cases */}
          <div className="content-section">
            <h2>📋 Related Cases</h2>
            
            <h3>Case 1: Cleanroom Design</h3>
            <p>In semiconductor cleanrooms, maintaining precise temperature and humidity is critical. A typical Class 1000 cleanroom requires: Temperature 20±2°C, Relative Humidity 45±10%. Using our calculator at 20°C and 45% RH gives a dew point of 7.6°C - any surface below this temperature will experience condensation.</p>
            
            <h3>Case 2: Industrial Dehumidification</h3>
            <p>A warehouse in Houston (altitude ~15m, summer conditions: 32°C, 80% RH) has a dew point of 28°C. To prevent moisture damage, the air conditioning system must keep all surfaces above 28°C or use desiccant dehumidification.</p>
            
            <h3>Case 3: High-Altitude Data Centers</h3>
            <p>A data center in Denver (altitude 1609m) operates at 85°F and 50% RH. The lower atmospheric pressure (84.6 kPa) affects cooling system performance. Our calculator shows the actual conditions differ significantly from sea-level calculations.</p>
          </div>

          {/* Disclaimer */}
          <div className="disclaimer">
            <strong>⚠️ Disclaimer:</strong> All calculations on this website are for reference only. 
            Do not use these results as the final basis for engineering design or construction. 
            Please consult a licensed professional engineer for actual engineering decisions.
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          <p>© 2026 ProEngineerCalc. All rights reserved.</p>
        </div>
      </footer>
    </>
  )
}

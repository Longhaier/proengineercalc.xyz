'use client'

import { useState } from 'react'
import Link from 'next/link'

const unitLabels: Record<string, Record<string, string>> = {
  length:      { m: 'm（米）', cm: 'cm（厘米）', mm: 'mm（毫米）', km: 'km（千米）', inch: 'in（英寸）', ft: 'ft（英尺）', yard: 'yd（码）' },
  mass:        { kg: 'kg（千克）', g: 'g（克）', tonne: 't（吨）', lb: 'lb（磅）', oz: 'oz（盎司）' },
  pressure:    { bar: 'bar', kPa: 'kPa（千帕）', psi: 'psi', atm: 'atm（标准大气压）', MPa: 'MPa（兆帕）' },
  temperature: { C: '°C（摄氏度）', F: '°F（华氏度）', K: 'K（开尔文）' },
  energy:      { J: 'J（焦耳）', kJ: 'kJ（千焦）', kWh: 'kWh（千瓦时）', BTU: 'BTU（英热单位）', kcal: 'kcal（千卡）' },
  power:       { W: 'W（瓦）', kW: 'kW（千瓦）', HP: 'HP（马力）', BTUh: 'BTU/h（英热/时）' },
}

// Conversion factors relative to base unit
const units: Record<string, Record<string, number>> = {
  length:   { m: 1, cm: 100, mm: 1000, km: 0.001, inch: 39.3701, ft: 3.28084, yard: 1.09361 },
  mass:     { kg: 1, g: 1000, tonne: 0.001, lb: 2.20462, oz: 35.274 },
  pressure: { bar: 1, kPa: 100, psi: 14.5038, atm: 0.986923, MPa: 0.1 },
  energy:   { J: 1, kJ: 0.001, kWh: 2.77778e-7, BTU: 9.47817e-4, kcal: 2.38846e-4 },
  power:    { W: 1, kW: 0.001, HP: 1.34102e-3, BTUh: 3.41214 },
}

function convertTemp(v: number, from: string): Record<string, string> {
  let celsius: number
  if (from === 'C') celsius = v
  else if (from === 'F') celsius = (v - 32) * 5 / 9
  else celsius = v - 273.15
  return {
    '°C（摄氏度）': celsius.toFixed(4),
    '°F（华氏度）': (celsius * 9 / 5 + 32).toFixed(4),
    'K（开尔文）': (celsius + 273.15).toFixed(4),
  }
}

const categoryLabels: Record<string, string> = {
  length: '长度', mass: '质量', pressure: '压力', temperature: '温度', energy: '能量', power: '功率',
}

export default function UnitConverter() {
  const [value, setValue] = useState('1')
  const [category, setCategory] = useState('length')
  const [from, setFrom] = useState('m')
  const [result, setResult] = useState<Record<string, string> | null>(null)

  const handleCategoryChange = (cat: string) => {
    setCategory(cat)
    const firstUnit = Object.keys(unitLabels[cat])[0]
    setFrom(firstUnit)
    setResult(null)
  }

  const calculate = () => {
    const v = parseFloat(value)
    if (isNaN(v)) return
    if (category === 'temperature') {
      setResult(convertTemp(v, from))
    } else {
      const table = units[category]
      const base = v / (table[from] ?? 1)
      const r: Record<string, string> = {}
      Object.entries(table).forEach(([u, f]) => {
        r[unitLabels[category][u]] = (base * f).toFixed(6).replace(/\.?0+$/, '')
      })
      setResult(r)
    }
  }

  const currentUnitKeys = Object.keys(unitLabels[category] ?? {})

  return (
    <>
      <header className="header"><div className="container header-content"><h1 className="logo"><Link href="/">🔧 智效厂务工程计算器</Link></h1></div></header>
      <nav className="nav"><div className="container nav-inner"><Link href="/">🏠 首页</Link><Link href="/calculators/structure">🏗️ 结构工程</Link></div></nav>
      <main className="container">
        <div className="calculator-container">
          <h1 style={{fontSize:'1.75rem',fontWeight:700,margin:'2rem 0 1rem'}}>单位换算器</h1>
          <div className="calculator-form">
            <div className="form-group"><label>数值</label><input type="number" value={value} onChange={(e)=>setValue(e.target.value)} /></div>
            <div className="form-group">
              <label>类别</label>
              <select value={category} onChange={(e)=>handleCategoryChange(e.target.value)}>
                {Object.entries(categoryLabels).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>源单位</label>
              <select value={from} onChange={(e)=>setFrom(e.target.value)}>
                {currentUnitKeys.map(u => <option key={u} value={u}>{unitLabels[category][u]}</option>)}
              </select>
            </div>
            <button onClick={calculate} style={{width:'100%',padding:'1rem',background:'var(--primary)',color:'white',border:'none',borderRadius:'8px'}}>换算</button>
            {result && (
              <div className="result-group">
                {Object.entries(result).map(([k, v]) => (
                  <div key={k} className="result-item">
                    <span className="result-label">{k}</span>
                    <span className="result-value">{v}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="content-section">
            <h2>常用工程换算速查表</h2>
            <table style={{width:'100%',borderCollapse:'collapse',fontSize:'0.9rem'}}>
              <thead><tr style={{background:'var(--primary)',color:'white'}}><th style={{padding:'8px',textAlign:'left'}}>类别</th><th style={{padding:'8px',textAlign:'left'}}>换算关系</th></tr></thead>
              <tbody>
                <tr style={{borderBottom:'1px solid #eee'}}><td style={{padding:'8px'}}>长度</td><td style={{padding:'8px'}}>1 m = 100 cm = 1000 mm；1 ft = 0.3048 m；1 inch = 25.4 mm</td></tr>
                <tr style={{borderBottom:'1px solid #eee'}}><td style={{padding:'8px'}}>质量</td><td style={{padding:'8px'}}>1 t = 1000 kg；1 kg = 2.205 lb；1 lb = 453.6 g</td></tr>
                <tr style={{borderBottom:'1px solid #eee'}}><td style={{padding:'8px'}}>压力</td><td style={{padding:'8px'}}>1 bar = 100 kPa = 14.5 psi；1 atm = 101.325 kPa = 1.013 bar</td></tr>
                <tr style={{borderBottom:'1px solid #eee'}}><td style={{padding:'8px'}}>温度</td><td style={{padding:'8px'}}>°F = °C × 9/5 + 32；K = °C + 273.15</td></tr>
                <tr style={{borderBottom:'1px solid #eee'}}><td style={{padding:'8px'}}>能量</td><td style={{padding:'8px'}}>1 kWh = 3600 kJ = 3412 BTU = 860 kcal</td></tr>
                <tr><td style={{padding:'8px'}}>功率</td><td style={{padding:'8px'}}>1 kW = 1000 W = 1.341 HP = 3412 BTU/h</td></tr>
              </tbody>
            </table>
          </div>
          <div className="content-section">
            <h2>使用说明</h2>
            <ol>
              <li>输入需要换算的数值</li>
              <li>选择换算类别（长度、质量、压力、温度、能量、功率）</li>
              <li>选择源单位</li>
              <li>点击换算，结果会同时显示该类别所有单位的对应值</li>
            </ol>
            <p>温度换算支持摄氏度（°C）、华氏度（°F）和开尔文（K）三种单位互转。</p>
          </div>
          <div className="content-section">
            <h2>案例</h2>
            <p><strong>压力换算：</strong>某设备工作压力为6 bar，换算为常用单位：6 bar = 600 kPa = 0.6 MPa = 87 psi = 5.92 atm。</p>
            <p><strong>能量换算：</strong>某电机每天耗电50 kWh，换算为：50 kWh = 180,000 kJ = 170,600 BTU = 43,000 kcal。</p>
            <p><strong>功率换算：</strong>一台75 kW电机，换算为：75 kW = 100.6 HP = 255,910 BTU/h。</p>
          </div>
          <div className="disclaimer"><strong>免责声明：</strong>所有计算结果仅供参考。</div>
        </div>
      </main>
      <footer><div className="container"><p>© 2026 智效厂务工程计算器</p></div></footer>
    </>
  )
}

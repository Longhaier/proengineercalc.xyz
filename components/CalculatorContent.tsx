'use client'

import { useState } from 'react'

interface FormulaProps {
  formulas: { name: string; formula: string; description: string }[]
}

interface TermProps {
  terms: { term: string; definition: string }[]
}

interface GuideProps {
  steps: { title: string; description: string }[]
}

interface FAQProps {
  faqs: { question: string; answer: string }[]
}

interface CaseStudyProps {
  cases: { title: string; description: string; result: string }[]
}

export function FormulaSection({ formulas }: FormulaProps) {
  return (
    <section className="content-section">
      <h2>计算公式与原理</h2>
      <p>以下是本计算器涉及的物理公式及详细原理说明：</p>
      {formulas.map((item, index) => (
        <div key={index} className="formula-box">
          <h4>{item.name}</h4>
          <div className="formula">{item.formula}</div>
          <p>{item.description}</p>
        </div>
      ))}
    </section>
  )
}

export function TermsSection({ terms }: TermProps) {
  return (
    <section className="content-section">
      <h2>相关名词解释</h2>
      <dl className="terms-list">
        {terms.map((item, index) => (
          <div key={index} className="term-item">
            <dt>{item.term}</dt>
            <dd>{item.definition}</dd>
          </div>
        ))}
      </dl>
    </section>
  )
}

export function GuideSection({ steps }: GuideProps) {
  return (
    <section className="content-section">
      <h2>使用指南</h2>
      <p>按照以下步骤进行计算：</p>
      <ol className="guide-steps">
        {steps.map((step, index) => (
          <li key={index} className="guide-step">
            <h4>{step.title}</h4>
            <p>{step.description}</p>
          </li>
        ))}
      </ol>
    </section>
  )
}

export function FAQSection({ faqs }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="content-section">
      <h2>常见问题 (FAQ)</h2>
      <div className="faq-list">
        {faqs.map((faq, index) => (
          <div key={index} className={`faq-item ${openIndex === index ? 'open' : ''}`}>
            <button className="faq-question" onClick={() => setOpenIndex(openIndex === index ? null : index)}>
              {faq.question}
              <span className="faq-toggle">{openIndex === index ? '−' : '+'}</span>
            </button>
            {openIndex === index && <div className="faq-answer">{faq.answer}</div>}
          </div>
        ))}
      </div>
    </section>
  )
}

export function CaseSection({ cases }: CaseStudyProps) {
  return (
    <section className="content-section">
      <h2>相关案例</h2>
      {cases.map((item, index) => (
        <div key={index} className="case-box">
          <h4>{item.title}</h4>
          <p>{item.description}</p>
          <div className="case-result">
            <strong>计算结果：</strong>{item.result}
          </div>
        </div>
      ))}
    </section>
  )
}

export function CalculatorContent({
  formulas,
  terms,
  steps,
  faqs,
  cases
}: {
  formulas: { name: string; formula: string; description: string }[]
  terms: { term: string; definition: string }[]
  steps: { title: string; description: string }[]
  faqs: { question: string; answer: string }[]
  cases: { title: string; description: string; result: string }[]
}) {
  return (
    <>
      <FormulaSection formulas={formulas} />
      <TermsSection terms={terms} />
      <GuideSection steps={steps} />
      <FAQSection faqs={faqs} />
      <CaseSection cases={cases} />
    </>
  )
}

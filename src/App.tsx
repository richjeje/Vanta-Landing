import { useMemo, useState } from 'react'
import emailjs from '@emailjs/browser'
import './App.css'

type Lang = 'es' | 'en'

type FormState = {
  name: string
  company: string
  whatsapp: string
  email: string
  industry: string
  goal: string
  message: string
  website: string
}

const WHATSAPP_LINK_ES =
  'https://wa.me/524495411077?text=Hola,%20soy%20___%20de%20___%20(industria:%20___).%20Quiero%20un%20diagn%C3%B3stico%20para%20saber%20si%20mi%20negocio%20es%20rentable%20y%20c%C3%B3mo%20mejorarlo.'

const SIGNATURE = '— Vanta Solutions | Aguascalientes | @Vantasolutions'

const content = {
  es: {
    nav: {
      services: 'Servicios',
      process: 'Proceso',
      cases: 'Casos',
      faq: 'FAQ',
      contact: 'Contacto',
    },
    ctaPrimary: 'Solicitar diagnostico (sin costo)',
    ctaSecondary: 'WhatsApp',
    pricingLine: 'Proyectos desde $15,000 MXN (IVA incluido) · Diagnostico sin costo',
    hero: {
      eyebrow: 'Aguascalientes, Mexico · ES/EN',
      title: 'Control y rentabilidad con software a medida.',
      subtitle:
        'Implementamos tecnologia para que tu PYME opere con claridad: automatizacion, desarrollo web y UX/UI enfocados en datos, margen y decisiones.',
    },
    aside: {
      kpi1Label: 'Diagnostico',
      kpi1Value: 'Sin costo',
      kpi2Label: 'Modelo',
      kpi2Value: 'Por proyecto',
      kpi3Label: 'Enfoque',
      kpi3Value: 'Personalizado',
    },
    clarity: {
      title: 'Lo que no se mide, no se mejora.',
      body:
        'Te ayudamos a entender con datos si tu modelo actual es rentable, donde se pierde dinero y que ajustes te acercan a un negocio mas solido y escalable.',
    },
    problemsTitle: 'Problemas que frenan a una PYME',
    resultsTitle: 'Resultados que construimos contigo',
    problems: [
      'Operacion manual y lenta: errores, retrabajo y tiempos perdidos.',
      'Datos dispersos: sin visibilidad real de costos y rentabilidad.',
      'Herramientas genericas que no encajan con tu operacion.',
    ],
    results: [
      'Claridad: indicadores y tableros con informacion confiable.',
      'Eficiencia: automatizaciones que reducen tiempos y fallas.',
      'Adopcion: UX/UI simple para que el equipo lo use de verdad.',
    ],
    services: {
      title: 'Servicios',
      subtitle: 'Tres frentes, un objetivo: control y rentabilidad.',
      items: [
        {
          title: 'Desarrollo web orientado a negocio',
          body: 'Sistemas internos, portales, dashboards e integraciones.',
        },
        {
          title: 'Automatizacion de procesos',
          body: 'Flujos, reportes, alertas y conexiones entre herramientas.',
        },
        {
          title: 'UX/UI estrategica',
          body: 'Diseno minimalista enfocado en conversion y operacion diaria.',
        },
      ],
    },
    differentiator: {
      title: 'Personalizacion real. Nada generico.',
      subtitle:
        'Partimos de tu necesidad especifica: procesos, roles, restricciones y metricas. Construimos software que encaja con tu negocio y te da control operativo y financiero.',
    },
    process: {
      title: 'Proceso',
      subtitle: 'Simple, visible y orientado a entrega.',
      steps: [
        {
          title: 'Diagnostico sin costo',
          body: 'Entendemos operacion, objetivos y datos disponibles.',
        },
        {
          title: 'Propuesta por alcance',
          body: 'Entregables, tiempos y costo por proyecto.',
        },
        {
          title: 'Implementacion por sprints',
          body: 'Entregas y visibilidad continua del avance.',
        },
        {
          title: 'Lanzamiento + mejora',
          body: 'Soporte y optimizacion con foco en impacto.',
        },
      ],
    },
    cases: {
      title: 'Casos',
      subtitle: 'Dos ejemplos reales de implementacion.',
      items: [
        {
          title: 'Restaurantes: POS + Mesero + KDS + Inventario',
          body:
            'Implementacion end-to-end para venta, operacion en piso, cocina (KDS) e inventario general.',
          extra:
            'La velocidad en cocina y el flujo del mesero permitieron priorizar atencion y mejorar la experiencia del cliente en tiempo real.',
          metrics: ['80% mas eficiencia en tiempo de meseros', '+23% ticket promedio', '90% expectativas cumplidas'],
        },
        {
          title: 'Salud (Dental): Agenda web + gestion + metricas',
          body:
            'Sistema integral para consultorios: citas desde sitio web, costos por tratamiento, sesiones estimadas y seguimiento financiero.',
          extra:
            'En 2 meses, el consultorio logro una agenda mas llena y una experiencia de atencion mas consistente.',
          metrics: ['+50% agenda mas llena (en 2 meses)', 'Mejor atencion al paciente', 'Pacientes mas satisfechos'],
        },
      ],
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Respuestas directas para tomar decision rapido.',
      items: [
        {
          q: 'Cuanto tarda un proyecto?',
          a: 'Depende del alcance. En el diagnostico definimos un roadmap realista con hitos claros.',
        },
        {
          q: 'Como definen alcance y costo?',
          a: 'Por proyecto y por entregables. Priorizamos impacto y evitamos sorpresas.',
        },
        {
          q: 'El codigo es del cliente?',
          a: 'Si. El sistema y sus entregables quedan para el cliente segun lo acordado en propuesta.',
        },
        {
          q: 'Incluyen soporte post-lanzamiento?',
          a: 'Si. Definimos un plan de soporte y mejora segun tus necesidades.',
        },
        {
          q: 'Pueden integrar con lo que ya uso?',
          a: 'Si. Integramos flujos y datos para reducir trabajo manual y duplicidad.',
        },
        {
          q: 'Trabajan con empresas fuera de Aguascalientes?',
          a: 'Si. Trabajamos remoto y coordinamos por entregas.',
        },
      ],
    },
    contact: {
      title: 'Solicita tu diagnostico sin costo.',
      subtitle: 'Envia el formulario (1 minuto).',
      formTitle: 'Formulario corto',
      submit: 'Enviar solicitud',
      submitting: 'Enviando...',
      success: 'Listo. Recibimos tu solicitud. Te contactamos por WhatsApp.',
      error:
        'No se pudo enviar en este momento. Prueba por WhatsApp o intenta de nuevo.',
      note: 'Sin spam. Solo para coordinar tu diagnostico.',
      fields: {
        name: 'Nombre',
        company: 'Empresa',
        whatsapp: 'WhatsApp',
        email: 'Correo',
        industry: 'Industria',
        goal: 'Objetivo principal',
        message: 'Mensaje (opcional)',
      },
      industries: ['Salud', 'Servicios', 'Logistica', 'Restaurantes', 'Otra'],
      goals: [
        'Rentabilidad',
        'Control operativo',
        'Automatizacion',
        'Experiencia del cliente',
        'Otro',
      ],
    },
    footer: {
      title: 'VANTA SOLUTIONS',
      location: 'Aguascalientes, Mexico',
      email: 'VantaSolutions-Service@outlook.com',
      instagram: '@Vantasolutions',
    },
  },
  en: {
    nav: {
      services: 'Services',
      process: 'Process',
      cases: 'Cases',
      faq: 'FAQ',
      contact: 'Contact',
    },
    ctaPrimary: 'Request free diagnostic',
    ctaSecondary: 'WhatsApp',
    pricingLine: 'Projects from $15,000 MXN (VAT included) · Free diagnostic',
    hero: {
      eyebrow: 'Aguascalientes, Mexico · ES/EN',
      title: 'Control and profitability through custom software.',
      subtitle:
        'We help SMBs operate with clarity: automation, web development, and UX/UI built around real processes, metrics, and margin.',
    },
    aside: {
      kpi1Label: 'Diagnostic',
      kpi1Value: 'Free',
      kpi2Label: 'Model',
      kpi2Value: 'Project-based',
      kpi3Label: 'Approach',
      kpi3Value: 'Tailored',
    },
    clarity: {
      title: "If you can't measure it, you can't improve it.",
      body:
        'We help you validate profitability, find what drains margin, and implement the right systems so you can scale with control.',
    },
    problemsTitle: 'Common blockers',
    resultsTitle: 'Outcomes',
    problems: [
      'Manual operations that cause errors and rework.',
      'Scattered data with no real visibility on cost and margin.',
      'Generic tools that do not fit how you operate.',
    ],
    results: [
      'Clarity: reliable dashboards and KPIs.',
      'Efficiency: automation that removes friction and mistakes.',
      'Adoption: UX/UI your team actually uses.',
    ],
    services: {
      title: 'Services',
      subtitle: 'Three fronts, one goal: control and profitability.',
      items: [
        {
          title: 'Business-focused web development',
          body: 'Internal systems, portals, dashboards, and integrations.',
        },
        {
          title: 'Process automation',
          body: 'Workflows, reports, alerts, and system connections.',
        },
        {
          title: 'Strategic UX/UI',
          body: 'Minimal design focused on adoption and conversion.',
        },
      ],
    },
    differentiator: {
      title: 'Real customization. No generic solutions.',
      subtitle:
        'We map your operation first: flows, roles, constraints, and KPIs. Then we build software that fits your business, safely and measurably.',
    },
    process: {
      title: 'Process',
      subtitle: 'Simple, transparent, delivery-focused.',
      steps: [
        {
          title: 'Free diagnostic',
          body: 'We understand your operation, goals, and available data.',
        },
        {
          title: 'Fixed-scope proposal',
          body: 'Deliverables, timeline, and project price.',
        },
        {
          title: 'Sprint execution',
          body: 'Frequent deliveries and full visibility.',
        },
        {
          title: 'Launch + improve',
          body: 'Support and optimization focused on impact.',
        },
      ],
    },
    cases: {
      title: 'Cases',
      subtitle: 'Two real examples.',
      items: [
        {
          title: 'Restaurants: POS + Waiter + KDS + Inventory',
          body:
            'End-to-end system for sales, floor operations, kitchen display (KDS), and inventory.',
          extra:
            'Faster kitchen execution and a clearer waiter workflow improved service quality and customer experience in real time.',
          metrics: ['80% more waiter efficiency', '+23% average ticket', '90% expectations met'],
        },
        {
          title: 'Dental clinics: Web booking + management + finance metrics',
          body:
            'Full system: website booking, treatment cost tracking, estimated sessions, and financial visibility.',
          extra:
            'In 2 months, the clinic achieved a fuller schedule and a more consistent patient experience.',
          metrics: ['+50% fuller schedule (in 2 months)', 'Better patient experience', 'Happier patients'],
        },
      ],
    },
    faq: {
      title: 'FAQ',
      subtitle: 'Straight answers.',
      items: [
        {
          q: 'How long does a project take?',
          a: 'It depends on scope. During the diagnostic we define a realistic roadmap and milestones.',
        },
        {
          q: 'How do you price?',
          a: 'Project-based and deliverable-based. We focus on impact and avoid surprises.',
        },
        {
          q: 'Do we own the code?',
          a: 'Yes. The system and deliverables are yours as defined in the proposal.',
        },
        {
          q: 'Do you offer post-launch support?',
          a: 'Yes. We define the right support and improvement plan for your needs.',
        },
        {
          q: 'Can you integrate with our current tools?',
          a: 'Yes. We integrate data and workflows to reduce manual work and duplication.',
        },
        {
          q: 'Do you work remotely?',
          a: 'Yes. We deliver remotely and coordinate around clear milestones.',
        },
      ],
    },
    contact: {
      title: 'Request your free diagnostic.',
      subtitle: 'Send the form (1 minute).',
      formTitle: 'Short form',
      submit: 'Send request',
      submitting: 'Sending...',
      success: "Done. We received your request. We'll reach out via WhatsApp.",
      error: 'Could not send right now. Try WhatsApp or retry.',
      note: 'No spam. Only to coordinate your diagnostic.',
      fields: {
        name: 'Name',
        company: 'Company',
        whatsapp: 'WhatsApp',
        email: 'Email',
        industry: 'Industry',
        goal: 'Main goal',
        message: 'Message (optional)',
      },
      industries: ['Health', 'Services', 'Logistics', 'Restaurants', 'Other'],
      goals: ['Profitability', 'Operational control', 'Automation', 'Customer experience', 'Other'],
    },
    footer: {
      title: 'VANTA SOLUTIONS',
      location: 'Aguascalientes, Mexico',
      email: 'VantaSolutions-Service@outlook.com',
      instagram: '@Vantasolutions',
    },
  },
} satisfies Record<Lang, unknown>

function scrollToId(id: string) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function App() {
  const [lang, setLang] = useState<Lang>(() => {
    const raw = localStorage.getItem('lang')
    if (raw === 'es' || raw === 'en') return raw
    const nav = navigator.language.toLowerCase()
    return nav.startsWith('es') ? 'es' : 'en'
  })

  const t = content[lang]

  const [form, setForm] = useState<FormState>({
    name: '',
    company: '',
    whatsapp: '',
    email: '',
    industry: '',
    goal: '',
    message: '',
    website: '',
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const env = useMemo(() => {
    return {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined,
      leadTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_LEAD as string | undefined,
      autoTemplateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID_AUTOREPLY as string | undefined,
    }
  }, [])

  function onLang(next: Lang) {
    setLang(next)
    localStorage.setItem('lang', next)
    document.documentElement.lang = next
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()

    // Honeypot
    if (form.website.trim().length > 0) return

    if (!env.serviceId || !env.publicKey || !env.leadTemplateId || !env.autoTemplateId) {
      setStatus('error')
      return
    }

    if (!form.name || !form.company || !form.whatsapp || !form.email || !form.industry || !form.goal) {
      setStatus('error')
      return
    }

    setStatus('loading')

    const timestamp = new Date().toISOString()

    const baseParams = {
      from_name: 'VANTA SOLUTIONS',
      name: form.name,
      company: form.company,
      whatsapp: form.whatsapp,
      email: form.email,
      industry: form.industry,
      goal: form.goal,
      message: form.message,
      lang,
      timestamp,
      signature: SIGNATURE,
    }

    try {
      await emailjs.send(
        env.serviceId,
        env.leadTemplateId,
        {
          ...baseParams,
          subject: 'New request FreeDiagnostic',
        },
        {
          publicKey: env.publicKey,
        },
      )

      await emailjs.send(
        env.serviceId,
        env.autoTemplateId,
        {
          ...baseParams,
          subject: lang === 'es' ? 'Recibimos tu solicitud' : 'We received your request',
          reply_body:
            lang === 'es'
              ? `Recibimos tu solicitud de diagnostico sin costo. Te contactamos por WhatsApp.\n\n${SIGNATURE}`
              : `We received your free diagnostic request. We'll reach out via WhatsApp.\n\n${SIGNATURE}`,
        },
        {
          publicKey: env.publicKey,
        },
      )

      setStatus('success')
      setForm({
        name: '',
        company: '',
        whatsapp: '',
        email: '',
        industry: '',
        goal: '',
        message: '',
        website: '',
      })
    } catch {
      setStatus('error')
    }
  }

  return (
    <div className="app">
      <header className="header">
        <div className="container header-inner">
          <a href="#" className="brand" onClick={(e) => (e.preventDefault(), scrollToId('top'))}>
            <span>VANTA</span>
            <small>SOLUTIONS</small>
          </a>

          <nav className="nav" aria-label="Primary">
            <a href="#services" onClick={(e) => (e.preventDefault(), scrollToId('services'))}>
              {t.nav.services}
            </a>
            <a href="#process" onClick={(e) => (e.preventDefault(), scrollToId('process'))}>
              {t.nav.process}
            </a>
            <a href="#cases" onClick={(e) => (e.preventDefault(), scrollToId('cases'))}>
              {t.nav.cases}
            </a>
            <a href="#faq" onClick={(e) => (e.preventDefault(), scrollToId('faq'))}>
              {t.nav.faq}
            </a>
          </nav>

          <div className="header-cta">
            <div className="lang" aria-label="Language">
              <button type="button" aria-pressed={lang === 'es'} onClick={() => onLang('es')}>
                ES
              </button>
              <button type="button" aria-pressed={lang === 'en'} onClick={() => onLang('en')}>
                EN
              </button>
            </div>
            <button type="button" className="btn btn-primary" onClick={() => scrollToId('contact')}>
              {t.ctaPrimary}
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="container hero-grid">
            <div>
              <span className="h-eyebrow">{t.hero.eyebrow}</span>
              <h1 className="h-title">{t.hero.title}</h1>
              <p>{t.hero.subtitle}</p>

              <div className="hero-actions">
                <button type="button" className="btn btn-primary" onClick={() => scrollToId('contact')}>
                  {t.ctaPrimary}
                </button>
                <a className="btn" href={WHATSAPP_LINK_ES} target="_blank" rel="noreferrer">
                  {t.ctaSecondary}
                </a>
              </div>
              <div className="note" style={{ marginTop: 10 }}>
                {t.pricingLine}
              </div>
            </div>

            <aside className="card hero-aside">
              <div className="kpi">
                <div className="label">{t.aside.kpi1Label}</div>
                <div className="value">{t.aside.kpi1Value}</div>
              </div>
              <div style={{ height: 10 }} />
              <div className="kpi">
                <div className="label">{t.aside.kpi2Label}</div>
                <div className="value">{t.aside.kpi2Value}</div>
              </div>
              <div style={{ height: 10 }} />
              <div className="kpi">
                <div className="label">{t.aside.kpi3Label}</div>
                <div className="value">{t.aside.kpi3Value}</div>
              </div>
              <div style={{ height: 14 }} />
              <div className="note">{SIGNATURE}</div>
            </aside>
          </div>
        </section>

        <section className="section" aria-label="Positioning">
          <div className="container">
            <div className="section-title">
              <h2 className="h-title">{t.clarity.title}</h2>
              <p>{t.clarity.body}</p>
            </div>
          </div>
        </section>

        <section className="section" aria-label="Problems and outcomes">
          <div className="container grid grid-2">
            <div className="card card-pad">
              <h3 className="h-title">{t.problemsTitle}</h3>
              <div className="list">
                {t.problems.map((x: string) => (
                  <div key={x}>{x}</div>
                ))}
              </div>
            </div>
            <div className="card card-pad">
              <h3 className="h-title">{t.resultsTitle}</h3>
              <div className="list">
                {t.results.map((x: string) => (
                  <div key={x}>{x}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="section" aria-label="Services">
          <div className="container">
            <div className="section-title">
              <h2 className="h-title">{t.services.title}</h2>
              <p>{t.services.subtitle}</p>
            </div>
            <div style={{ height: 16 }} />
            <div className="grid grid-3">
              {t.services.items.map((s: { title: string; body: string }) => (
                <div key={s.title} className="card card-pad">
                  <h3 className="h-title">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" aria-label="Differentiator">
          <div className="container">
            <div className="card card-pad">
              <div className="section-title">
                <h2 className="h-title">{t.differentiator.title}</h2>
                <p>{t.differentiator.subtitle}</p>
              </div>
            </div>
          </div>
        </section>

        <section id="process" className="section" aria-label="Process">
          <div className="container">
            <div className="section-title">
              <h2 className="h-title">{t.process.title}</h2>
              <p>{t.process.subtitle}</p>
            </div>
            <div style={{ height: 16 }} />
            <div className="grid grid-2">
              {t.process.steps.map((s: { title: string; body: string }) => (
                <div key={s.title} className="card card-pad">
                  <h3 className="h-title">{s.title}</h3>
                  <p>{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="cases" className="section" aria-label="Cases">
          <div className="container">
            <div className="section-title">
              <h2 className="h-title">{t.cases.title}</h2>
              <p>{t.cases.subtitle}</p>
            </div>
            <div style={{ height: 16 }} />
            <div className="grid grid-2">
              {t.cases.items.map((c: { title: string; body: string; extra?: string; metrics?: string[] }) => (
                <div key={c.title} className="card card-pad">
                  <h3 className="h-title">{c.title}</h3>
                  <p>{c.body}</p>
                  {c.extra ? <p style={{ marginTop: 10, color: 'var(--muted2)' }}>{c.extra}</p> : null}
                  {c.metrics && c.metrics.length > 0 ? (
                    <div className="chips" aria-label="Case metrics">
                      {c.metrics.map((m) => (
                        <span key={m} className="chip">
                          {m}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="section" aria-label="FAQ">
          <div className="container">
            <div className="section-title">
              <h2 className="h-title">{t.faq.title}</h2>
              <p>{t.faq.subtitle}</p>
            </div>
            <div style={{ height: 16 }} />
            <div className="grid">
              {t.faq.items.map((item: { q: string; a: string }) => (
                <details key={item.q} className="card card-pad">
                  <summary style={{ cursor: 'pointer', fontFamily: '"Space Grotesk", system-ui, sans-serif' }}>
                    {item.q}
                  </summary>
                  <div style={{ height: 10 }} />
                  <p style={{ margin: 0, color: 'var(--muted)' }}>{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section" aria-label="Contact">
          <div className="container grid grid-2">
            <div>
              <div className="section-title" style={{ justifyContent: 'flex-start', flexDirection: 'column', alignItems: 'flex-start' }}>
                <h2 className="h-title" style={{ marginBottom: 6 }}>
                  {t.contact.title}
                </h2>
                <p>{t.contact.subtitle}</p>
              </div>
              <div style={{ height: 14 }} />
              <a className="btn" href={WHATSAPP_LINK_ES} target="_blank" rel="noreferrer">
                {t.ctaSecondary}
              </a>
              <div style={{ height: 10 }} />
              <div className="note">{t.footer.email}</div>
            </div>

            <form className="card form" onSubmit={onSubmit}>
              <h3 className="h-title" style={{ marginTop: 0 }}>
                {t.contact.formTitle}
              </h3>

              <div style={{ display: 'none' }}>
                <label htmlFor="website">Website</label>
                <input
                  id="website"
                  value={form.website}
                  onChange={(e) => setForm((s) => ({ ...s, website: e.target.value }))}
                />
              </div>

              <div className="field-grid">
                <div>
                  <label htmlFor="name">{t.contact.fields.name}</label>
                  <input
                    id="name"
                    value={form.name}
                    onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
                    placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="company">{t.contact.fields.company}</label>
                  <input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm((s) => ({ ...s, company: e.target.value }))}
                    placeholder={lang === 'es' ? 'Nombre de tu empresa' : 'Company name'}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="whatsapp">{t.contact.fields.whatsapp}</label>
                  <input
                    id="whatsapp"
                    value={form.whatsapp}
                    onChange={(e) => setForm((s) => ({ ...s, whatsapp: e.target.value }))}
                    placeholder={lang === 'es' ? '+52...' : '+52...'}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email">{t.contact.fields.email}</label>
                  <input
                    id="email"
                    type="email"
                    value={form.email}
                    onChange={(e) => setForm((s) => ({ ...s, email: e.target.value }))}
                    placeholder={lang === 'es' ? 'tu@empresa.com' : 'you@company.com'}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="industry">{t.contact.fields.industry}</label>
                  <select
                    id="industry"
                    value={form.industry}
                    onChange={(e) => setForm((s) => ({ ...s, industry: e.target.value }))}
                    required
                  >
                    <option value="">{lang === 'es' ? 'Selecciona' : 'Select'}</option>
                    {t.contact.industries.map((x: string) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="goal">{t.contact.fields.goal}</label>
                  <select
                    id="goal"
                    value={form.goal}
                    onChange={(e) => setForm((s) => ({ ...s, goal: e.target.value }))}
                    required
                  >
                    <option value="">{lang === 'es' ? 'Selecciona' : 'Select'}</option>
                    {t.contact.goals.map((x: string) => (
                      <option key={x} value={x}>
                        {x}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: 12 }}>
                <label htmlFor="message">{t.contact.fields.message}</label>
                <textarea
                  id="message"
                  value={form.message}
                  onChange={(e) => setForm((s) => ({ ...s, message: e.target.value }))}
                  placeholder={
                    lang === 'es'
                      ? 'Describe tu situacion en 1-2 lineas'
                      : 'Describe your situation in 1-2 lines'
                  }
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                  {status === 'loading' ? t.contact.submitting : t.contact.submit}
                </button>
                <a className="btn btn-quiet" href={WHATSAPP_LINK_ES} target="_blank" rel="noreferrer">
                  {t.ctaSecondary}
                </a>
                <span className="note">{t.pricingLine}</span>
                <span className="note">{t.contact.note}</span>
              </div>

              {status === 'success' ? <p className="note">{t.contact.success}</p> : null}
              {status === 'error' ? <p className="note">{t.contact.error}</p> : null}
            </form>
          </div>
        </section>

        <footer className="footer" aria-label="Footer">
          <div className="container footer-grid">
            <div>
              <div className="brand">
                <span>{t.footer.title}</span>
                <small>SOLUTIONS</small>
              </div>
              <div style={{ height: 10 }} />
              <div className="note">{t.footer.location}</div>
            </div>
            <div>
              <div className="note">{t.footer.email}</div>
              <div className="note">{t.footer.instagram}</div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

export default App

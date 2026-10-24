'use client'

import { FormEvent, useEffect, useState } from 'react'
import { ArrowUpRight, Check, Code2, ExternalLink, Globe2, Menu, MessageCircle, Moon, Send, Sun, X } from 'lucide-react'

type Translation = { fr: string; en: string }
type Project = {
  name: string
  displayName?: Translation
  type: Translation
  description: Translation
  role: Translation
  stack: string[] | { fr: string[]; en: string[] }
  image: string
  href: string
}

const projects: Project[] = [
  { name: 'Sedjro Créatif', type: { fr: 'Portfolio · Photographie et vidéo', en: 'Portfolio · Photography and video' }, description: { fr: 'Un portfolio qui présente le travail de Sedjro Créatif en photographie et vidéographie.', en: 'A portfolio showcasing Sedjro Créatif’s photography and videography work.' }, role: { fr: 'Développement web', en: 'Web development' }, stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'], image: '/sedjro-creatif.png', href: '#sedjro-creatif' },
  { name: 'Attièkè Dekoungbé', type: { fr: 'Développement web · Projet numérique', en: 'Web development · Digital project' }, description: { fr: 'Un projet web présenté avec sobriété, à partir des informations disponibles dans son environnement.', en: 'A thoughtfully presented web project based on the information available about it.' }, role: { fr: 'Développement web', en: 'Web development' }, stack: { fr: ['Projet à documenter'], en: ['Project to be documented'] }, image: '/attieke-project.png', href: '#attieke' },
  { name: 'Agent IA de santé', displayName: { fr: 'Agent IA de santé', en: 'AI Health Assistant' }, type: { fr: 'IA · Santé numérique · Innovation', en: 'AI · Digital health · Innovation' }, description: { fr: 'Un concept d’orientation préventive qui explore une information de santé plus accessible grâce à l’intelligence artificielle.', en: 'A preventive guidance concept exploring how AI can make health information more accessible.' }, role: { fr: 'Concept · Conception produit · Exploration de l’IA', en: 'Concept · Product design · AI exploration' }, stack: { fr: ['IA', 'Web', 'WhatsApp', 'Voix'], en: ['AI', 'Web', 'WhatsApp', 'Voice'] }, image: '/image3.png', href: '#health-agent' },
  { name: 'Dr-YASSO', type: { fr: 'Site personnel · Profil professionnel', en: 'Personal website · Professional profile' }, description: { fr: 'Un site web personnel et professionnel pour présenter un parcours, un profil et des activités avec clarté.', en: 'A personal and professional website presenting a career, profile and activities with clarity.' }, role: { fr: 'Développement web', en: 'Web development' }, stack: ['Next.js', 'React', 'TypeScript', 'Resend', 'SEO'], image: '/dr-yasso-project.png', href: '#dr-yasso' },
]

const services: [string, Translation, Translation, string][] = [
  ['01', { fr: 'Développement front-end', en: 'Front-End Development' }, { fr: 'Je transforme des maquettes, idées et besoins en interfaces web modernes, responsives et interactives.', en: 'I turn designs, ideas and requirements into modern, responsive and interactive web interfaces.' }, 'front-end-development'],
  ['02', { fr: 'Expérience numérique', en: 'Digital Experience' }, { fr: 'Je porte une attention particulière à la structure, à l’ergonomie et à l’expérience utilisateur.', en: 'I focus on structure, usability and the overall user experience.' }, 'digital-experience'],
  ['03', { fr: 'Contenu numérique', en: 'Digital Content' }, { fr: 'Je réfléchis à la manière dont un produit numérique est présenté, compris et partagé.', en: 'I shape how a digital product is presented, understood and shared.' }, 'digital-content'],
]

const process: [string, Translation, Translation][] = [
  ['01', { fr: 'Comprendre', en: 'Understand' }, { fr: 'Identifier le problème, les utilisateurs et le besoin réel.', en: 'Identify the problem, the users and the real need.' }],
  ['02', { fr: 'Structurer', en: 'Structure' }, { fr: 'Transformer les idées en fonctionnalités et parcours clairs.', en: 'Turn ideas into clear features and user journeys.' }],
  ['03', { fr: 'Concevoir', en: 'Design' }, { fr: 'Réfléchir à l’interface et à l’expérience utilisateur.', en: 'Shape the interface and the user experience.' }],
  ['04', { fr: 'Développer', en: 'Build' }, { fr: 'Construire une solution fonctionnelle, responsive et maintenable.', en: 'Build a functional, responsive and maintainable solution.' }],
  ['05', { fr: 'Tester et améliorer', en: 'Test and improve' }, { fr: 'Tester, corriger et améliorer continuellement le produit.', en: 'Continuously test, refine and improve the product.' }],
]

const networks = [
  { name: 'GitHub', handle: '@mahuena22', href: 'https://github.com/mahuena22', icon: Code2 },
  { name: 'WhatsApp', handle: 'Me contacter', href: 'https://wa.me/qr/OEHBY4TMXQTPC1', icon: MessageCircle },
  { name: 'Facebook', handle: 'Léa AHOUANSE', href: 'https://www.facebook.com/profile.php?id=100080120589321', icon: Globe2 },
  { name: 'Portfolio', handle: 'Léa AHOUANSE', href: '/', icon: Globe2 },
]

const copy = {
  fr: {
    about: 'À propos',
    services: 'Services',
    projects: 'Projets',
    contact: 'Contact',
    hello: '',
    role: 'Développeuse front-end',
    creator: 'Créatrice digitale',
    menuLabel: 'Ouvrir le menu',
    languageLabel: 'Changer de langue',
    themeLabel: 'Changer le thème',
    navigationLabel: 'Navigation principale',
    hero: 'Je transforme les besoins et les idées en solutions web modernes, utiles et accessibles.',
    view: 'Voir mes projets',
    reach: 'Me contacter',
    based: 'Basée à',
    available: 'Disponible pour vos projets',
    aboutLabel: '01 / À PROPOS',
    aboutTitle: <>Du code, mais<br /><em>pas seulement.</em></>,
    servicesLabel: '02 / SERVICES',
    skillsLabel: '03 / OUTILS & TECHNOLOGIES',
    skillsTitle: <>Les outils pour<br /><em>donner vie aux idées.</em></>,
    projectsLabel: '04 / PROJETS',
    projectsTitle: <>Mes projets<br /><em>sélectionnés.</em></>,
    methodLabel: '05 / MÉTHODE',
    methodTitle: <>Je ne commence pas<br />par le code. <em>Je commence<br />par comprendre.</em></>,
    beyondLabel: '06 / AU-DELÀ DU CODE',
    beyondTitle: <>Au-delà<br /><em>du code.</em></>,
    idea: <>Vous avez<br /><em>une idée ?</em></>,
    contactEyebrow: '> collaborons ensemble',
    contactText: 'Un site web, une plateforme, une interface ou simplement une idée que vous aimeriez transformer en projet ? Discutons-en.',
    connectTitle: 'connectons-nous',
    formTitle: 'envoyer_un_message',
    name: 'Nom',
    email: 'E-mail',
    message: 'Message',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours…',
    success: 'Merci, votre message a bien été envoyé !',
    error: 'Une erreur est survenue. Veuillez réessayer.',
    invalidForm: 'Vérifiez votre nom, votre adresse e-mail et votre message.',
    emailUnavailable: 'L’envoi d’e-mails n’est pas encore configuré. Réessayez plus tard.',
    emailFailed: 'Le message n’a pas pu être envoyé. Veuillez réessayer plus tard.',
    placeholderName: 'Votre nom',
    placeholderEmail: 'vous@exemple.com',
    placeholderMessage: 'Parlez-moi de votre projet…',
    directEmail: 'E-mail direct',
    location: 'Localisation',
    locationValue: 'Cotonou, Bénin',
    availability: 'Disponibilité',
    availableNow: 'Disponible pour de nouveaux projets',
    footer: 'Je transforme les besoins en expériences numériques.',
    backToTop: 'Retour en haut',
    projectLabel: 'Aperçu du projet',
    projectLink: 'En savoir plus sur',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'PHP', 'Laravel', 'API', 'Bases de données', 'Git', 'GitHub', 'Canva', 'CapCut', 'Trello', 'Outils d’IA'],
  },
  en: {
    about: 'About',
    services: 'Services',
    projects: 'Projects',
    contact: 'Contact',
    hello: '',
    role: 'Front-End Developer',
    creator: 'Digital Creator',
    menuLabel: 'Open menu',
    languageLabel: 'Change language',
    themeLabel: 'Toggle theme',
    navigationLabel: 'Main navigation',
    hero: 'I turn needs and ideas into modern, useful and accessible web solutions.',
    view: 'View my projects',
    reach: 'Get in touch',
    based: 'Based in',
    available: 'Available for projects',
    aboutLabel: '01 / ABOUT',
    aboutTitle: <>Code, but<br /><em>not only.</em></>,
    servicesLabel: '02 / SERVICES',
    skillsLabel: '03 / TOOLS & TECHNOLOGIES',
    skillsTitle: <>The tools to<br /><em>bring ideas to life.</em></>,
    projectsLabel: '04 / PROJECTS',
    projectsTitle: <>Featured<br /><em>projects.</em></>,
    methodLabel: '05 / PROCESS',
    methodTitle: <>I don’t start<br />with code. <em>I start<br />by understanding.</em></>,
    beyondLabel: '06 / BEYOND CODE',
    beyondTitle: <>Beyond<br /><em>the code.</em></>,
    idea: <>Have<br /><em>an idea?</em></>,
    contactEyebrow: "> let's work together",
    contactText: 'A website, a platform, an interface or simply an idea you would like to turn into a project? Let’s talk about it.',
    connectTitle: "let's_connect",
    formTitle: 'send_message',
    name: 'Name',
    email: 'E-mail',
    message: 'Message',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Thank you, your message has been sent!',
    error: 'Something went wrong. Please try again.',
    invalidForm: 'Check your name, email address and message.',
    emailUnavailable: 'Email delivery is not configured yet. Please try again later.',
    emailFailed: 'The message could not be sent. Please try again later.',
    placeholderName: 'Your name',
    placeholderEmail: 'you@example.com',
    placeholderMessage: 'Tell me about your project…',
    directEmail: 'Direct email',
    location: 'Location',
    locationValue: 'Cotonou, Benin',
    availability: 'Availability',
    availableNow: 'Available for new projects',
    footer: 'I turn needs into digital experiences.',
    backToTop: 'Back to top',
    projectLabel: 'Project preview',
    projectLink: 'Learn more about',
    skills: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'PHP', 'Laravel', 'APIs', 'Databases', 'Git', 'GitHub', 'Canva', 'CapCut', 'Trello', 'AI tools'],
  },
}

export default function Page() {
  const [dark, setDark] = useState(true)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [sent, setSent] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const [submitError, setSubmitError] = useState('')
  const t = copy[lang]

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('site-language')
    if (savedLanguage === 'fr' || savedLanguage === 'en') setLang(savedLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = lang === 'fr'
      ? 'Léa AHOUANSE — Développeuse front-end et créatrice digitale'
      : 'Léa AHOUANSE — Front-End Developer & Digital Creator'
  }, [lang])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent('sending')
    setSubmitError('')

    try {
      const form = event.currentTarget
      const formData = new FormData(form)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          message: formData.get('message'),
        }),
      })

      if (!response.ok) {
        setSubmitError(
          response.status === 400
            ? t.invalidForm
            : response.status === 503
              ? t.emailUnavailable
              : t.emailFailed,
        )
        setSent('error')
        return
      }

      form.reset()
      setSent('success')
    } catch {
      setSubmitError(t.error)
      setSent('error')
    }
  }

  function toggleLanguage() {
    const nextLanguage = lang === 'fr' ? 'en' : 'fr'
    window.localStorage.setItem('site-language', nextLanguage)
    setLang(nextLanguage)
  }

  return (
    <div className={dark ? 'site dark' : 'site'}>
      <header className="topbar">
        <a className="brand" href="#top">Léa<span>.</span></a>
        <button className="menu-toggle" aria-label={t.menuLabel} onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
        <nav className={menuOpen ? 'open' : ''} aria-label={t.navigationLabel}>
          <a href="#about">{t.about}</a>
          <a href="#services">{t.services}</a>
          <a href="#projects">{t.projects}</a>
          <a href="#contact">{t.contact}</a>
        </nav>
        <button className="language-toggle" aria-label={t.languageLabel} onClick={toggleLanguage}>
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
        <button className="theme-toggle" aria-label={t.themeLabel} onClick={() => setDark(!dark)}>
          {dark ? <Sun size={17} /> : <Moon size={17} />}
        </button>
      </header>

      <main id="top">
        <section
          className="hero section-grid"
          style={{ backgroundImage: "url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202026-10-04%20at%2010.36.11-7yJwYkZizdq7N66BmlA2S6COxzdISm.jpeg')" }}
        >
          {t.hello ? <div className="eyebrow">&gt; {t.hello}</div> : null}
          <div>
            <p className="kicker">{t.role} <span>·</span> {t.creator}</p>
            <h1>Léa<br /><em>AHOUANSE</em></h1>
            <p className="hero-copy">{t.hero}</p>
            <div className="cta-row">
              <a className="button primary" href="#projects">{t.view} <ArrowUpRight size={16} /></a>
              <a className="button" href="#contact">{t.reach} <ArrowUpRight size={16} /></a>
            </div>
          </div>
          <div className="hero-note">
            {t.based}<br />
            <strong>{t.locationValue}</strong><br />
            <span>{t.available}</span>
          </div>
        </section>

        <section id="about" className="about section-grid">
          <div className="section-label">{t.aboutLabel}</div>
          <div>
            <h2>{t.aboutTitle}</h2>
            <div className="about-copy">
              <p>
                {lang === 'fr' ? (
                  <>
                    Je suis <strong>Léa AHOUANSE</strong>, développeuse web spécialisée en front-end et créatrice de contenu digital.<br /><br />
                    J’aime transformer une idée, un besoin ou un problème en une expérience numérique claire, moderne et agréable à utiliser.<br /><br />
                    Le développement web est au cœur de mon activité. Mes compétences en design, communication digitale et création de contenu me permettent d’avoir une vision plus globale d’un projet.
                  </>
                ) : (
                  <>
                    I’m <strong>Léa AHOUANSE</strong>, a front-end web developer and digital content creator.<br /><br />
                    I enjoy turning an idea, a need or a problem into a clear, modern and enjoyable digital experience.<br /><br />
                    Web development is at the heart of my work. My skills in design, digital communication and content creation give me a broader view of every project.
                  </>
                )}
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="services section-grid">
          <div className="section-label">{t.servicesLabel}</div>
          <div className="service-list">
            {services.map(([number, title, text, slug]) => (
              <a className="service" href={`/services/${slug}`} key={number}>
                <span>{number}</span>
                <div>
                  <h3>{title[lang]}</h3>
                  <p>{text[lang]}</p>
                </div>
                <ArrowUpRight size={19} />
              </a>
            ))}
          </div>
        </section>

        <section className="skills section-grid">
          <div className="section-label">{t.skillsLabel}</div>
          <div>
            <h2>{t.skillsTitle}</h2>
            <div className="skill-cloud">
              {t.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" className="projects">
          <div className="projects-heading">
            <div className="section-label">{t.projectsLabel}</div>
            <h2>{t.projectsTitle}</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project" id={project.href.slice(1)} key={project.name}>
                <div className="project-image">
                    <img src={project.image} alt={`${t.projectLabel} ${project.displayName?.[lang] ?? project.name}`} />
                    <span>{project.type[lang]}</span>
                </div>
                <div className="project-info">
                  <div>
                    <h3>{project.displayName?.[lang] ?? project.name}</h3>
                    <p>{project.description[lang]}</p>
                  </div>
                  <div className="project-meta">
                    <span>{project.role[lang]}</span>
                    <div>
                      {(Array.isArray(project.stack) ? project.stack : project.stack[lang]).map((item) => (
                        <small key={item}>{item}</small>
                      ))}
                    </div>
                  </div>
                  <a href={project.href} aria-label={`${t.projectLink} ${project.displayName?.[lang] ?? project.name}`}>
                    <ExternalLink size={17} />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="method section-grid">
          <div className="section-label">05 / {lang === 'fr' ? 'MÉTHODE' : 'PROCESS'}</div>
          <div>
            <h2>{t.methodTitle}</h2>
            <div className="process-list">
              {process.map(([number, title, text]) => (
                <div className="process" key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title[lang]}</h3>
                    <p>{text[lang]}</p>
                  </div>
                  <Check size={17} />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="beyond section-grid">
          <div className="section-label">06 / {lang === 'fr' ? 'AU-DELÀ DU CODE' : 'BEYOND CODE'}</div>
          <div>
            <h2>{t.beyondTitle}</h2>
            <p>
              {lang === 'fr' ? (
                <>
                  Le développement web est mon cœur de métier.<br /><br />
                  Mais comprendre un produit ne s’arrête pas à écrire du code. Mes expériences en création de contenu, design et communication digitale m’ont appris à regarder un projet sous plusieurs angles : le produit, l’utilisateur, l’image et le message.
                </>
              ) : (
                <>
                  Web development is my core craft.<br /><br />
                  But understanding a product goes beyond writing code. My experience in content creation, design and digital communication taught me to look at a project from multiple angles: the product, the user, the image and the message.
                </>
              )}
            </p>
          </div>
        </section>

        {/* Section let's work together avec le bouton Me contacter */}
        <section className="work-together">
          <p className="eyebrow">&gt; {t.contactEyebrow.slice(2)}</p>
          <h2>{t.idea}</h2>
          <p>{t.contactText}</p>
          <a className="button primary" href="#contact">
            {t.reach} <ArrowUpRight size={16} />
          </a>
        </section>

        {/* Section contact juste après le bouton Me contacter */}
        <section id="contact" className="contact-section">
          <div className="contact-columns" aria-label={lang === 'fr' ? 'Contact' : 'Contact information'}>
            <div className="contact-networks">
              <h3 className="terminal-title"><span>&gt;</span> {t.connectTitle}</h3>
              <div className="network-grid">
                {networks.map(({ name, handle, href, icon: Icon }) => (
                  <a
                    className="network-card"
                    href={href}
                    key={name}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noreferrer' : undefined}
                  >
                    <Icon aria-hidden="true" size={32} strokeWidth={1.8} />
                    <span>
                      <strong>{name}</strong>
                      <small>{handle}</small>
                    </span>
                    <ArrowUpRight aria-hidden="true" className="network-arrow" size={16} />
                  </a>
                ))}
              </div>

              <div className="contact-direct-info">
                <div>{t.directEmail} : <a href="mailto:lenaahouanse@gmail.com">lenaahouanse@gmail.com <ArrowUpRight size={14} /></a></div>
                <div>{t.location} : <strong>{t.locationValue}</strong></div>
                <div><span className="avail">{t.availableNow}</span></div>
              </div>
            </div>

            <div className="contact-form-wrap">
              <h3 className="terminal-title"><span>&gt;</span> {t.formTitle}</h3>
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    {t.name}
                    <input name="name" required placeholder={t.placeholderName} />
                  </label>
                  <label>
                    {t.email}
                    <input name="email" type="email" required placeholder={t.placeholderEmail} />
                  </label>
                </div>
                <label>
                  {t.message}
                  <textarea name="message" required placeholder={t.placeholderMessage} rows={5} />
                </label>
                <button className="contact-submit" type="submit" disabled={sent === 'sending'}>
                  {sent === 'sending' ? t.sending : t.submit} <Send aria-hidden="true" size={16} />
                </button>
                {sent === 'success' && (
                  <p className="form-status success" role="status">
                    <Check size={16} /> {t.success}
                  </p>
                )}
                {sent === 'error' && (
                  <p className="form-status error" role="alert">
                    {submitError || t.error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div>
          <a className="brand" href="#top">Léa<span>.</span></a>
          <p>{t.role} · {t.creator}</p>
        </div>
        <p>{t.footer}</p>
        <a href="#top" className="top-link">{t.backToTop} ↑</a>
      </footer>
    </div>
  )
}

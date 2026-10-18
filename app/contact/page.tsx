'use client'

import { ArrowLeft, ArrowUpRight, Check, Code2, Globe2, Mail, Moon, Send, Sun } from 'lucide-react'
import Link from 'next/link'
import { FormEvent, useEffect, useState } from 'react'

const content = {
  fr: {
    back: 'Retour au portfolio',
    connect: 'connectons-nous',
    send: 'envoyer_message',
    more: 'Afficher plus',
    name: 'Nom',
    email: 'E-mail',
    message: 'Message',
    submit: 'Envoyer le message',
    sending: 'Envoi en cours…',
    success: 'Merci, votre message a bien été envoyé !',
    error: 'Une erreur est survenue. Veuillez réessayer.',
    placeholderName: 'Votre nom',
    placeholderEmail: 'vous@exemple.com',
    placeholderMessage: 'Parlez-moi de votre projet…',
    directEmail: 'E-mail direct',
    location: 'Localisation',
    availability: 'Disponibilité',
    availableNow: 'Disponible pour de nouveaux projets',
    footer: 'Je transforme les besoins en expériences numériques.',
    locationValue: 'Cotonou, Bénin',
    navigation: 'Navigation de contact',
    languageLabel: 'Changer de langue',
    themeLabel: 'Changer le thème',
    role: 'Développeuse front-end',
    creator: 'Créatrice digitale',
  },
  en: {
    back: 'Back to portfolio',
    connect: "let's_connect",
    send: 'send_message',
    more: 'Show more',
    name: 'Name',
    email: 'E-mail',
    message: 'Message',
    submit: 'Send message',
    sending: 'Sending…',
    success: 'Thank you, your message has been sent!',
    error: 'Something went wrong. Please try again.',
    placeholderName: 'Your name',
    placeholderEmail: 'you@example.com',
    placeholderMessage: 'Tell me about your project…',
    directEmail: 'Direct email',
    location: 'Location',
    availability: 'Availability',
    availableNow: 'Available for new projects',
    footer: 'I turn needs into digital experiences.',
    locationValue: 'Cotonou, Benin',
    navigation: 'Contact navigation',
    languageLabel: 'Change language',
    themeLabel: 'Toggle theme',
    role: 'Front-End Developer',
    creator: 'Digital Creator',
  },
}

const networks = [
  { name: 'GitHub', handle: '@mahuena22', href: 'https://github.com/mahuena22', icon: Code2 },
  { name: 'LinkedIn', handle: 'Léa AHOUANSE', href: 'https://www.linkedin.com/in/lea-ahouanse', icon: Globe2 },
  { name: 'Instagram', handle: '@lea_ahouanse', href: 'https://instagram.com/lea_ahouanse', icon: Globe2 },
  { name: 'Facebook', handle: 'Léa AHOUANSE', href: 'https://facebook.com/lea.ahouanse', icon: Mail },
  { name: 'Portfolio', handle: 'Léa AHOUANSE', href: '/', icon: Globe2 },
]

export default function ContactPage() {
  const [lang, setLang] = useState<'fr' | 'en'>('fr')
  const [dark, setDark] = useState(true)
  const [sent, setSent] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')
  const t = content[lang]

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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSent('sending')
    window.setTimeout(() => setSent('success'), 700)
  }

  function toggleLanguage() {
    const nextLanguage = lang === 'fr' ? 'en' : 'fr'
    window.localStorage.setItem('site-language', nextLanguage)
    setLang(nextLanguage)
  }

  return (
    <div className={dark ? 'site dark' : 'site'}>
      <header className="topbar">
        <Link className="brand" href="/">Léa<span>.</span></Link>
        <nav aria-label={t.navigation}><Link href="/">{t.back}</Link></nav>
        <button className="language-toggle" aria-label={t.languageLabel} onClick={toggleLanguage}>{lang === 'fr' ? 'EN' : 'FR'}</button>
        <button className="theme-toggle" aria-label={t.themeLabel} onClick={() => setDark(!dark)}>{dark ? <Sun size={17} /> : <Moon size={17} />}</button>
      </header>

      <main className="contact-terminal">
        <section className="contact-columns" aria-label={lang === 'fr' ? 'Contact' : 'Contact information'}>
          <div className="contact-networks">
            <h1 className="terminal-title"><span>&gt;</span> {t.connect}</h1>
            <div className="network-grid">
              {networks.map(({ name, handle, href, icon: Icon }) => (
                <a className="network-card" href={href} key={name} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}>
                  <Icon aria-hidden="true" size={32} strokeWidth={1.8} />
                  <span><strong>{name}</strong><small>{handle}</small></span>
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
            <h2 className="terminal-title"><span>&gt;</span> {t.send}</h2>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-row">
                <label>{t.name}<input name="name" required placeholder={t.placeholderName} /></label>
                <label>{t.email}<input name="email" type="email" required placeholder={t.placeholderEmail} /></label>
              </div>
              <label>{t.message}<textarea name="message" required placeholder={t.placeholderMessage} rows={6} /></label>
              <button className="contact-submit" type="submit" disabled={sent === 'sending'}>
                {sent === 'sending' ? t.sending : t.submit} <Send aria-hidden="true" size={16} />
              </button>
              {sent === 'success' && <p className="form-status success" role="status"><Check size={16} /> {t.success}</p>}
              {sent === 'error' && <p className="form-status error" role="alert">{t.error}</p>}
            </form>
          </div>
        </section>
        <Link className="contact-back" href="/"><ArrowLeft size={15} /> {t.back}</Link>
      </main>

      <footer>
        <div>
          <Link className="brand" href="/">Léa<span>.</span></Link>
          <p>{t.role} · {t.creator}</p>
        </div>
        <p>{t.footer}</p>
        <Link href="/" className="top-link">{t.back} ↑</Link>
      </footer>
    </div>
  )
}

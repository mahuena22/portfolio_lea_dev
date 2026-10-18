'use client'

import { ArrowLeft, ArrowUpRight, Check } from 'lucide-react'
import { useEffect, useState } from 'react'

type Language = 'fr' | 'en'
type Content = { title: string; intro: string; description: string; deliverables: string[] }

const serviceData: Record<string, Record<Language, Content>> = {
  'front-end-development': { fr: { title: 'Développement front-end', intro: 'Des interfaces rapides, accessibles et pensées pour être utilisées.', description: 'Je transforme une direction visuelle ou une idée en interface web solide. Chaque détail est conçu pour offrir une expérience fluide sur mobile, tablette et ordinateur.', deliverables: ['Interfaces adaptatives et accessibles', 'Composants réutilisables et faciles à maintenir', 'Animations utiles et micro-interactions', 'Intégration fidèle des maquettes'] }, en: { title: 'Front-End Development', intro: 'Fast, accessible interfaces designed to be used.', description: 'I turn a visual direction or an idea into a robust web interface. Every detail is designed to create a smooth experience across mobile, tablet and desktop.', deliverables: ['Responsive and accessible interfaces', 'Reusable and maintainable components', 'Useful animations and micro-interactions', 'Faithful design implementation'] } },
  'web-development': { fr: { title: 'Développement web', intro: 'Des produits web clairs, fiables et adaptés à vos vrais besoins.', description: 'Du site vitrine à la plateforme métier, je développe des expériences web qui restent simples à comprendre et faciles à faire évoluer.', deliverables: ['Architecture technique adaptée', 'Développement de sites et plateformes', 'Formulaires, données et fonctionnalités métier', 'Optimisation des performances'] }, en: { title: 'Web Development', intro: 'Clear, reliable web products adapted to your real needs.', description: 'From marketing websites to business platforms, I build web experiences that remain easy to understand and ready to evolve.', deliverables: ['Purpose-built technical architecture', 'Website and platform development', 'Forms, data and business features', 'Performance optimization'] } },
  'digital-experience': { fr: { title: 'Expérience numérique', intro: 'Une expérience pensée avant d’être dessinée.', description: 'Je clarifie la structure, les parcours et les interactions pour que chaque écran réponde à un besoin précis et que chaque action semble naturelle.', deliverables: ['Audit et clarification des parcours', 'Architecture de l’information', 'Maquettes fonctionnelles et prototypes', 'Recommandations concrètes en expérience utilisateur'] }, en: { title: 'Digital Experience', intro: 'An experience considered before it is designed.', description: 'I clarify structure, journeys and interactions so every screen answers a precise need and every action feels natural.', deliverables: ['Journey audit and clarification', 'Information architecture', 'Wireframes and prototypes', 'Actionable UX recommendations'] } },
  'digital-content': { fr: { title: 'Contenu numérique', intro: 'Des contenus cohérents pour donner une voix à votre projet.', description: 'Je crée des contenus visuels et éditoriaux qui rendent une marque plus lisible, plus humaine et plus mémorable sur ses canaux numériques.', deliverables: ['Stratégie et calendrier éditorial', 'Création de contenus pour les réseaux', 'Direction artistique et narration', 'Montage vidéo et déclinaisons'] }, en: { title: 'Digital Content', intro: 'Consistent content that gives your project a voice.', description: 'I create visual and editorial content that makes a brand clearer, more human and more memorable across its digital channels.', deliverables: ['Content strategy and editorial planning', 'Social media content creation', 'Visual direction and storytelling', 'Video editing and adaptations'] } },
}

export default function ServiceDetailClient({ slug }: { slug: string }) {
  const [lang, setLang] = useState<Language>('fr')
  const [dark, setDark] = useState(true)
  const content = (serviceData[slug] ?? serviceData['front-end-development'])[lang]
  const isFrench = lang === 'fr'

  useEffect(() => {
    const savedLanguage = window.localStorage.getItem('site-language')
    if (savedLanguage === 'fr' || savedLanguage === 'en') setLang(savedLanguage)
  }, [])

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = `${content.title} — Léa AHOUANSE`
  }, [content.title, lang])

  function toggleLanguage() {
    const nextLanguage = lang === 'fr' ? 'en' : 'fr'
    window.localStorage.setItem('site-language', nextLanguage)
    setLang(nextLanguage)
  }

  return <main className={dark ? 'site dark service-detail-page' : 'site service-detail-page'}>
    <header className="topbar"><a className="brand" href="/">Léa<span>.</span></a><nav aria-label={isFrench ? 'Navigation principale' : 'Main navigation'}><a href="/#about">{isFrench ? 'À propos' : 'About'}</a><a href="/#services">Services</a><a href="/#projects">{isFrench ? 'Projets' : 'Projects'}</a></nav><button className="language-toggle" aria-label={isFrench ? 'Changer de langue' : 'Change language'} onClick={toggleLanguage}>{isFrench ? 'EN' : 'FR'}</button><button className="theme-toggle" aria-label={isFrench ? 'Changer le thème' : 'Toggle theme'} onClick={() => setDark(!dark)}>{dark ? '☼' : '◐'}</button></header>
    <section className="service-detail-hero"><a className="back-link" href="/#services"><ArrowLeft size={16} /> {isFrench ? 'Retour aux services' : 'Back to services'}</a><p className="eyebrow">02 / SERVICE</p><h1>{content.title}</h1><p className="service-intro">{content.intro}</p></section>
    <section className="service-detail-content"><div><p className="section-label">{isFrench ? 'L’APPROCHE' : 'THE APPROACH'}</p></div><div><p className="detail-description">{content.description}</p><div className="deliverables"><p className="section-label">{isFrench ? 'CE QUE JE PROPOSE' : 'WHAT I DELIVER'}</p>{content.deliverables.map((item) => <div className="deliverable" key={item}><Check size={17} /><span>{item}</span></div>)}</div><a className="button primary" href="/#contact">{isFrench ? 'Parlons de votre projet' : 'Let’s talk about your project'} <ArrowUpRight size={16} /></a></div></section>
    <footer><div><a className="brand" href="/">Léa<span>.</span></a><p>{isFrench ? 'Développeuse front-end · Créatrice digitale' : 'Front-End Developer · Digital Creator'}</p></div><a href="/#contact" className="top-link">{isFrench ? 'Me contacter' : 'Get in touch'} ↗</a></footer>
  </main>
}

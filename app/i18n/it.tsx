import type { Translations } from "./types";

export const it: Translations = {
  nav: {
    about: "Chi sono",
    skills: "Competenze",
    certifications: "Certificazioni",
    projects: "Progetti",
    blog: "Blog",
    contact: "Contatti",
    openMenu: "Apri menu",
    language: "Lingua",
    theme: "Tema",
    switchToEnglish: "Passa all'inglese",
    switchToItalian: "Passa all'italiano",
  },
  hero: {
    tagline: "Full-Stack / Cloud Architect",
    description:
      "Sistemi scalabili, dal pixel al cloud. Progetto e sviluppo applicazioni full-stack con focus su performance, affidabilità e developer experience.",
    viewProjects: "Vedi Progetti ↓",
    getInTouch: "Contattami",
  },
  about: {
    label: "01 — Chi sono",
    heading: "Chi sono",
    p1: () => (
      <>
        {"Sono un "}
        <strong>ingegnere full-stack</strong>
        {" e un "}
        <strong>cloud architect</strong>
        {" con la passione per la realizzazione di "}
        <strong>sistemi robusti e scalabili</strong>
        {". Lavoro su tutto lo "}
        <strong>stack</strong>
        {" — dalla progettazione di UI pixel-perfect all'architettura di "}
        <strong>infrastrutture cloud distribuite</strong>
        {"."}
      </>
    ),
    p2: () => (
      <>
        {"Mi specializzo nel tradurre "}
        <strong>requisiti di business complessi</strong>
        {" in soluzioni tecniche eleganti. Che si tratti di una "}
        <strong>pipeline di dati in tempo reale</strong>
        {", un'"}
        <strong>architettura a microservizi</strong>
        {", o un'"}
        <strong>interfaccia utente rifinita</strong>
        {" — curo ogni dettaglio del progetto a ogni livello."}
      </>
    ),
    p3: () => (
      <>
        {"Quando non sto programmando, esploro nuove tecnologie, "}
        <strong>contribuisco all'open source</strong>
        {" e occasionalmente "}
        <strong>scrivo di ingegneria del software</strong>
        {"."}
      </>
    ),
    stats: [
      { value: "5+", label: "Anni di\nesperienza" },
      { value: "30+", label: "Progetti\nconsegnati" },
      { value: "10+", label: "Tecnologie\npadroneggiante" },
    ],
  },
  skills: {
    label: "02 — Competenze",
    heading: "Stack & Strumenti",
    categories: {
      Frontend: "Frontend",
      Backend: "Backend",
      "Cloud & Infrastructure": "Cloud & Infrastruttura",
      "Tools & Practices": "Strumenti & Pratiche",
    },
  },
  certifications: {
    label: "03 — Certificazioni",
    heading: "Credenziali",
    verify: "Verifica →",
  },
  projects: {
    label: "04 — Lavori",
    heading: "Progetti Selezionati",
    details: "Dettagli",
    source: "↗ Sorgente",
    live: "↗ Live",
    backToProjects: "← Torna ai progetti",
    viewOnGithub: "↗ Vedi su GitHub",
    liveSite: "↗ Sito live",
  },
  blog: {
    label: "05 — Articoli",
    heading: "Dal Blog",
    indexHeading: "Blog",
    indexDescription:
      "Riflessioni su ingegneria full-stack, cloud architecture e software craft.",
    emptyTitle: "Articoli in arrivo.",
    emptySubtitle: "Restate sintonizzati.",
    readPost: "Leggi →",
    allPosts: "Tutti gli articoli ↗",
    dateLocale: "it-IT",
    backToBlog: "← Torna al blog",
  },
  contact: {
    label: "06 — Contatti",
    headingLine1: "Costruiamo",
    headingLine2: "qualcosa di ",
    headingHighlight: "grande",
    headingLine3: "insieme.",
  },
  footer: {
    builtWith: "Realizzato con React Router + Tailwind CSS",
  },
  error: {
    oops: "Oops!",
    unexpectedError: "Si è verificato un errore imprevisto.",
    notFound: "404",
    notFoundDetails: "La pagina richiesta non è stata trovata.",
    error: "Errore",
  },
  admin: {
    label: "Admin",
    login: {
      heading: "Accedi",
      password: "Password",
      submit: "Accedi",
      invalidPassword: "Password non valida",
    },
    posts: {
      heading: "Articoli",
      newPost: "+ Nuovo articolo",
      signOut: "Esci",
      noPosts: "Nessun articolo ancora.",
      published: "Pubblicato",
      draft: "Bozza",
      editPost: "Modifica articolo",
      deletePost: "Elimina articolo",
    },
    editor: {
      backToPosts: "← Articoli",
      newPost: "Nuovo articolo",
      editPost: "Modifica articolo",
      title: "Titolo",
      slug: "Slug",
      description: "Descrizione",
      tags: "Tag",
      tagsHint: "(separati da virgola)",
      content: "Contenuto",
      publish: "Pubblica",
      save: "Salva",
      saving: "Salvataggio…",
      titleRequired: "Titolo e slug sono obbligatori",
      slugExists: "Esiste già un articolo con questo slug",
    },
  },
};

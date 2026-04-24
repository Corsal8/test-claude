import type { Translations } from "./types";

export const en: Translations = {
  nav: {
    about: "About",
    skills: "Skills",
    certifications: "Certifications",
    projects: "Projects",
    blog: "Blog",
    contact: "Contact",
    openMenu: "Open menu",
    language: "Language",
    theme: "Theme",
    switchToEnglish: "Switch to English",
    switchToItalian: "Switch to Italian",
  },
  hero: {
    tagline: "Full-Stack / Cloud Architect",
    description:
      "Building scalable systems from pixel to cloud. I design and engineer full-stack applications with a focus on performance, reliability, and developer experience.",
    viewProjects: "View Projects ↓",
    getInTouch: "Get in Touch",
  },
  about: {
    label: "01 — About",
    heading: "Who I am",
    p1: () => (
      <>
        {"I'm a "}
        <strong>full-stack engineer</strong>
        {" and "}
        <strong>cloud architect</strong>
        {" with a passion for building "}
        <strong>robust, scalable systems</strong>
        {". I work across the "}
        <strong>entire stack</strong>
        {" — from designing pixel-perfect UIs to architecting "}
        <strong>distributed cloud infrastructure</strong>
        {"."}
      </>
    ),
    p2: () => (
      <>
        {"I specialise in translating "}
        <strong>complex business requirements</strong>
        {" into elegant technical solutions. Whether it's a "}
        <strong>real-time data pipeline</strong>
        {", a "}
        <strong>microservices architecture</strong>
        {", or a "}
        <strong>polished user interface</strong>
        {" — I care deeply about the craft at every layer."}
      </>
    ),
    p3: () => (
      <>
        {"When I'm not coding, I'm exploring new technologies, "}
        <strong>contributing to open source</strong>
        {", and occasionally "}
        <strong>writing about software engineering</strong>
        {"."}
      </>
    ),
    stats: [
      { value: "5+", label: "Years of\nexperience" },
      { value: "30+", label: "Projects\nshipped" },
      { value: "10+", label: "Technologies\nmastered" },
    ],
  },
  skills: {
    label: "02 — Skills",
    heading: "Stack & Tools",
    categories: {
      Frontend: "Frontend",
      Backend: "Backend",
      "Cloud & Infrastructure": "Cloud & Infrastructure",
      "Tools & Practices": "Tools & Practices",
    },
  },
  certifications: {
    label: "03 — Certifications",
    heading: "Credentials",
    verify: "Verify →",
  },
  projects: {
    label: "04 — Work",
    heading: "Selected Projects",
    details: "Details",
    source: "↗ Source",
    live: "↗ Live",
    backToProjects: "← Back to projects",
    viewOnGithub: "↗ View on GitHub",
    liveSite: "↗ Live Site",
  },
  blog: {
    label: "05 — Writing",
    heading: "From the Blog",
    indexHeading: "Blog",
    indexDescription:
      "Thoughts on full-stack engineering, cloud architecture, and software craft.",
    emptyTitle: "Posts coming soon.",
    emptySubtitle: "Stay tuned.",
    readPost: "Read post →",
    allPosts: "All posts ↗",
    dateLocale: "en-US",
    backToBlog: "← Back to blog",
  },
  contact: {
    label: "06 — Contact",
    headingLine1: "Let's build",
    headingLine2: "something ",
    headingHighlight: "great",
    headingLine3: "together.",
  },
  footer: {
    builtWith: "Built with React Router + Tailwind CSS",
  },
  error: {
    oops: "Oops!",
    unexpectedError: "An unexpected error occurred.",
    notFound: "404",
    notFoundDetails: "The requested page could not be found.",
    error: "Error",
  },
  admin: {
    label: "Admin",
    login: {
      heading: "Sign in",
      password: "Password",
      submit: "Sign in",
      invalidPassword: "Invalid password",
    },
    posts: {
      heading: "Posts",
      newPost: "+ New post",
      signOut: "Sign out",
      noPosts: "No posts yet.",
      published: "Published",
      draft: "Draft",
      editPost: "Edit post",
      deletePost: "Delete post",
    },
    editor: {
      backToPosts: "← Posts",
      newPost: "New post",
      editPost: "Edit post",
      title: "Title",
      slug: "Slug",
      description: "Description",
      tags: "Tags",
      tagsHint: "(comma-separated)",
      content: "Content",
      publish: "Publish",
      save: "Save",
      saving: "Saving…",
      titleRequired: "Title and slug are required",
      slugExists: "A post with that slug already exists",
    },
  },
};

import type { ReactNode } from "react";

export interface Translations {
  nav: {
    about: string;
    skills: string;
    certifications: string;
    projects: string;
    blog: string;
    contact: string;
    openMenu: string;
    language: string;
    theme: string;
    switchToEnglish: string;
    switchToItalian: string;
  };
  hero: {
    tagline: string;
    description: string;
    viewProjects: string;
    getInTouch: string;
  };
  about: {
    label: string;
    heading: string;
    p1: () => ReactNode;
    p2: () => ReactNode;
    p3: () => ReactNode;
    stats: ReadonlyArray<{ readonly value: string; readonly label: string }>;
  };
  skills: {
    label: string;
    heading: string;
    categories: {
      Frontend: string;
      Backend: string;
      "Cloud & Infrastructure": string;
      "Tools & Practices": string;
    };
  };
  certifications: {
    label: string;
    heading: string;
    verify: string;
  };
  projects: {
    label: string;
    heading: string;
    details: string;
    source: string;
    live: string;
    backToProjects: string;
    viewOnGithub: string;
    liveSite: string;
  };
  blog: {
    label: string;
    heading: string;
    indexHeading: string;
    indexDescription: string;
    emptyTitle: string;
    emptySubtitle: string;
    readPost: string;
    allPosts: string;
    dateLocale: string;
    backToBlog: string;
  };
  contact: {
    label: string;
    headingLine1: string;
    headingLine2: string;
    headingHighlight: string;
    headingLine3: string;
  };
  footer: {
    builtWith: string;
  };
  error: {
    oops: string;
    unexpectedError: string;
    notFound: string;
    notFoundDetails: string;
    error: string;
  };
  admin: {
    label: string;
    login: {
      heading: string;
      password: string;
      submit: string;
      invalidPassword: string;
    };
    posts: {
      heading: string;
      newPost: string;
      signOut: string;
      noPosts: string;
      published: string;
      draft: string;
      editPost: string;
      deletePost: string;
    };
    editor: {
      backToPosts: string;
      newPost: string;
      editPost: string;
      title: string;
      slug: string;
      description: string;
      tags: string;
      tagsHint: string;
      content: string;
      publish: string;
      save: string;
      saving: string;
      titleRequired: string;
      slugExists: string;
    };
  };
}

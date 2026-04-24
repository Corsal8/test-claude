import type { Route } from "./+types/home";
import { About } from "~/components/sections/About";
import { BlogPreview } from "~/components/sections/BlogPreview";
import { Certifications } from "~/components/sections/Certifications";
import { Contact } from "~/components/sections/Contact";
import { Hero } from "~/components/sections/Hero";
import { Projects } from "~/components/sections/Projects";
import { Skills } from "~/components/sections/Skills";
import { Ticker } from "~/components/sections/Ticker";
import { certifications } from "~/data/certifications";
import { projects } from "~/data/projects";
import { skills } from "~/data/skills";
import { getAllPosts } from "~/db/posts";
import { useScrollReveal } from "~/utils/useScrollReveal";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Your Name — Full-Stack / Cloud Architect" },
    {
      name: "description",
      content:
        "Full-Stack and Cloud Architect specializing in scalable systems and modern web applications.",
    },
  ];
}

export async function loader() {
  return { posts: await getAllPosts() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  useScrollReveal();

  return (
    <main>
      <Hero />
      <Ticker />
      <About />
      <Skills skills={skills} />
      <Certifications certifications={certifications} />
      <Projects projects={projects} />
      <BlogPreview posts={loaderData.posts} />
      <Contact />
    </main>
  );
}

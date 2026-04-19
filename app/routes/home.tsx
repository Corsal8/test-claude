import type { Route } from "./+types/home";
import { About } from "~/components/sections/About";
import { BlogPreview } from "~/components/sections/BlogPreview";
import { Contact } from "~/components/sections/Contact";
import { Hero } from "~/components/sections/Hero";
import { Projects } from "~/components/sections/Projects";
import { Skills } from "~/components/sections/Skills";
import { projects } from "~/data/projects";
import { skills } from "~/data/skills";
import { getAllPosts } from "~/utils/blog";

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

export function loader() {
  return { posts: getAllPosts() };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  return (
    <main>
      <Hero />
      <About />
      <Skills skills={skills} />
      <Projects projects={projects} />
      <BlogPreview posts={loaderData.posts} />
      <Contact />
    </main>
  );
}

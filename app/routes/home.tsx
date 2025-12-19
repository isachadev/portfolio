import { Contact } from "~/components/Contact";
import { Hero } from "~/components/Hero";
import { Projects } from "~/components/Projects";
import { Stack } from "~/components/Stack";
import { Experience } from "~/components/Experience";

export function meta() {
  return [
    { title: "Portfolio" },
    { name: "description", content: "Welcome to my portfolio" },
  ];
}

export default function Home() {
  return (
    <>
      <Hero />
      <Projects />
      <Experience />
      <Stack />
      <Contact />
    </>
  );
}
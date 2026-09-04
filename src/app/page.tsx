import { Hero } from "@/components/sections/hero";
import { Introduction } from "@/components/sections/introduction";
import { Capabilities } from "@/components/sections/capabilities";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Philosophy } from "@/components/sections/philosophy";
import { Contact } from "@/components/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <Introduction />
      <Capabilities />
      <Projects />
      <Skills />
      <Experience />
      <Philosophy />
      <Contact />
    </>
  );
}

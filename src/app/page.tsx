import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Philosophy } from "@/components/sections/Philosophy";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col xl:pl-24">
      <Nav />
      <main className="flex-1">
        <Hero />
        <Journey />
        <Projects />
        <Skills />
        <Philosophy />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

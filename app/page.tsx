import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Contact } from "@/components/sections/contact";
import { Bento } from "@/components/sections/bento";
import { LatestBlog } from "@/components/sections/latest-blog";
import { AIConcierge } from "@/components/sections/ai-concierge";
import { MegaStats } from "@/components/sections/mega-stats";
import { SectionRail } from "@/components/section-rail";
import { SectionHairline } from "@/components/section-hairline";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <SectionRail />
      <Hero />
      <MegaStats />
      <Bento />
      <SectionHairline />
      <About />
      <Experience />
      <SectionHairline />
      <Projects />
      <Skills />
      <SectionHairline />
      <AIConcierge />
      <LatestBlog />
      <Contact />
    </main>
  );
}

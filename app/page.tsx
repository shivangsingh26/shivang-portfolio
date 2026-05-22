import { Nav } from "@/components/nav";
import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { GitHubSection } from "@/components/sections/github";
import { Contact } from "@/components/sections/contact";
import { Marquee } from "@/components/marquee";
import { Bento } from "@/components/sections/bento";
import { Testimonials } from "@/components/sections/testimonials";
import { LatestBlog } from "@/components/sections/latest-blog";
import { SectionRail } from "@/components/section-rail";
import { ChatRoot } from "@/components/chat/chat-root";

export default function Page() {
  return (
    <main className="relative">
      <Nav />
      <SectionRail />
      <Hero />
      <Marquee />
      <Bento />
      <About />
      <Experience />
      <Projects />
      <Skills />
      <Testimonials />
      <GitHubSection />
      <LatestBlog />
      <Contact />
      <ChatRoot />
    </main>
  );
}

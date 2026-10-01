import Hero from "@/components/Hero";
import Projects from "@/components/Projects";
import LiveLab from "@/components/LiveLab";
import LatestPosts from "@/components/LatestPosts";
import About from "@/components/About";
import Contact from "@/components/Contact";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main className="mesh-bg min-h-screen">
      <Hero />
      <Projects />
      <LiveLab />
      <LatestPosts />
      <About />
      <Contact />
    </main>
  );
}

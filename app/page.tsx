import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkGrid from "@/components/WorkGrid";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/contact/Contact";
import { getAllPosts } from "@/lib/blog";
import SpotifyPlayer from "@/components/spotify/SpotifyPlayer";
import CursorRing from "@/components/CursorRing";
import PatternOverlay from "@/components/background/PatternOverlay";

export default function Home() {
  const posts = getAllPosts().slice(0, 2);
  return (
    <>
      <PatternOverlay />
      <CursorRing />
      <Nav />
      <main id="main-content" className="relative z-10">
        <Hero />
        <About />
        <WorkGrid />
        <BlogPreview posts={posts} />
        <Contact />
        <SpotifyPlayer />
        <footer className="px-8 md:px-16 lg:px-[340px] pb-16">
          <div className="border-t border-border" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-8 gap-2">
            <span className="font-mono text-[10px] text-border2 tracking-tag">
              &copy; {new Date().getFullYear()} ROHIT.
            </span>
            <span className="font-mono text-[10px] text-border2 tracking-tag">
              DESIGNED &amp; DEVELOPED BY ME
            </span>
          </div>
        </footer>
      </main>
    </>
  );
}

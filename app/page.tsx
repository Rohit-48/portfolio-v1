import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import About from "@/components/About";
import WorkGrid from "@/components/WorkGrid";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/contact/Contact";
import { getAllPosts } from "@/lib/blog";
export default function Home() {
  const posts = getAllPosts().slice(0, 2);
  return (
    <>
      <Nav />
      <main id="main-content" className="relative">
        <Hero />
        <About />
        <WorkGrid />
        <BlogPreview posts={posts} />
        <Contact />
        <footer className="max-w-[800px] mx-auto px-6 pb-10">
          <div className="border-t border-border" />
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pt-6 gap-2">
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

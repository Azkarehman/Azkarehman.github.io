import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export const metadata = {
  title: "Research Digest | Azka Rehman",
  description: "Curated highlights from recent medical imaging and AI research.",
};

export default function BlogIndex() {
  const posts = getAllPosts();

  return (
    <main className="min-h-screen px-6 py-24 max-w-3xl mx-auto">
      <Link href="/" className="text-accent text-sm hover:underline mb-8 inline-block">
        &larr; Back to portfolio
      </Link>

      <h1 className="font-serif text-4xl md:text-5xl font-bold text-ink mb-2 tracking-tight">
        Research Digest
      </h1>
      <p className="text-ink-muted mb-12 text-lg">
        Curated highlights from recent medical imaging and AI research, updated twice a week.
      </p>

      {posts.length === 0 ? (
        <p className="text-ink-muted italic">No posts yet. First issue coming soon!</p>
      ) : (
        <div className="space-y-6">
          {posts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="card p-6 block group">
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span className="text-ink-muted text-xs font-mono">{post.date}</span>
                {post.tags.map((tag) => (
                  <span key={tag} className="tag text-[0.6rem]">{tag}</span>
                ))}
              </div>
              <h2 className="font-serif text-xl font-semibold text-ink group-hover:text-accent transition-colors">
                {post.title}
              </h2>
              <p className="text-ink-light text-sm mt-2 leading-relaxed">{post.summary}</p>
              <span className="text-accent text-sm mt-3 inline-block">Read more &rarr;</span>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}

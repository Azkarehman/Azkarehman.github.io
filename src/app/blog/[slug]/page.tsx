import Link from "next/link";
import { getAllPostSlugs, getPostContent } from "@/lib/posts";

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta } = await getPostContent(slug);
  return { title: `${meta.title} | Azka Rehman` };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { meta, contentHtml } = await getPostContent(slug);

  return (
    <main className="min-h-screen px-6 py-24 max-w-3xl mx-auto">
      <Link href="/blog" className="text-accent text-sm hover:underline mb-8 inline-block">
        &larr; All posts
      </Link>

      <article>
        <header className="mb-10">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <span className="text-ink-muted text-sm font-mono">{meta.date}</span>
            {meta.tags.map((tag) => (
              <span key={tag} className="tag text-xs">{tag}</span>
            ))}
          </div>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-ink tracking-tight leading-tight">
            {meta.title}
          </h1>
          <p className="text-ink-light mt-3 text-lg">{meta.summary}</p>
        </header>

        <div
          className="prose prose-ink max-w-none"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {meta.papers && meta.papers.length > 0 && (
          <section className="mt-12 pt-8 border-t border-border">
            <h2 className="font-serif text-xl font-semibold text-ink mb-4">Papers Referenced</h2>
            <ul className="space-y-3">
              {meta.papers.map((paper, i) => (
                <li key={i} className="text-sm">
                  <a
                    href={paper.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:underline font-medium"
                  >
                    {paper.title}
                  </a>
                  <p className="text-ink-muted">{paper.authors}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </main>
  );
}

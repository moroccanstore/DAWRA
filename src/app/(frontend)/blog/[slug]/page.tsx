import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payloadClient'
import { generatePageMetadata, generateJsonLd } from '@/lib/seo'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const post = result.docs[0] as any
    if (!post) return { title: 'Post Not Found' }

    return generatePageMetadata({
        title: post.seo?.title || post.title,
        description: post.seo?.description || post.excerpt,
        path: `/blog/${slug}`,
        image: typeof post.featuredImage === 'object' && post.featuredImage?.url ? post.featuredImage.url : undefined,
        type: 'article',
        publishedAt: post.publishedAt,
        modifiedAt: post.updatedAt,
    })
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'posts',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const post = result.docs[0] as any
    if (!post) notFound()

    return (
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: generateJsonLd({
                        type: 'Article',
                        headline: post.title,
                        description: post.excerpt,
                        datePublished: post.publishedAt,
                        dateModified: post.updatedAt,
                        author: {
                            '@type': 'Organization',
                            name: 'Dawra',
                        },
                    }),
                }}
            />

            <header className="mb-12 text-center">
                {post.category && (
                    <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-4 block">
                        {typeof post.category === 'object' ? post.category.name : 'Category'}
                    </span>
                )}
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6">{post.title}</h1>
                <div className="flex items-center justify-center text-sm text-gray-500 gap-6">
                    {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
                    {post.readingTime && <span>{post.readingTime} min read</span>}
                </div>
            </header>

            {/* Featured Image placeholder or render here */}
            {post.featuredImage && typeof post.featuredImage === 'object' && post.featuredImage.url && (
                <div className="mb-12 rounded-xl overflow-hidden bg-gray-100">
                    <img src={post.featuredImage.url} alt={post.featuredImage.alt || post.title} className="w-full h-auto object-cover" />
                </div>
            )}

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Render Payload Lexical JSON here. Using a placeholder for now since we need a Lexical renderer */}
                <p className="text-gray-500 italic border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 dark:bg-zinc-900 rounded-r-lg">
                    [Rich text content goes here. The CMS provides a JSON object native to Lexical, which needs `@payloadcms/richtext-lexical/react` to render.]
                </p>

                {/* Sample dump of the JSON structure to verify it loaded */}
                {process.env.NODE_ENV === 'development' && (
                    <details className="mt-8 p-4 bg-gray-100 dark:bg-zinc-900 rounded text-xs overflow-auto">
                        <summary className="font-medium cursor-pointer mb-2">Debug Content Payload</summary>
                        <pre className="mt-2">{JSON.stringify(post.content, null, 2)}</pre>
                    </details>
                )}
            </div>
        </article>
    )
}

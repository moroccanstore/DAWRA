import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export const metadata: Metadata = {
    title: 'Blog | Dawra',
    description: 'Latest insights, tutorials, and news about AI and automation.',
}

export default async function BlogListingPage() {
    const payload = await getPayloadClient()
    const posts = await payload.find({
        collection: 'posts',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt',
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">Blog & Insights</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">Discover the latest in AI, automation, and business growth.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {posts.docs.map((post: any) => (
                    <Link key={post.id} href={`/blog/${post.slug}`} className="group block h-full bg-white dark:bg-black border border-gray-200 dark:border-zinc-800 rounded-xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                        <div className="p-6 flex-1 flex flex-col">
                            {post.category && (
                                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2">
                                    {typeof post.category === 'object' ? post.category.name : 'Category'}
                                </span>
                            )}
                            <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors">{post.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 flex-1">{post.excerpt}</p>
                            <div className="flex items-center text-xs text-gray-500 gap-4 mt-auto">
                                {post.publishedAt && <span>{new Date(post.publishedAt).toLocaleDateString()}</span>}
                                {post.readingTime && <span>{post.readingTime} min read</span>}
                            </div>
                        </div>
                    </Link>
                ))}
                {posts.docs.length === 0 && (
                    <p className="text-gray-500 col-span-full">No posts available at the moment.</p>
                )}
            </div>
        </div>
    )
}

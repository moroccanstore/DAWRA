import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export const metadata: Metadata = {
    title: 'Dawra — AI Content & Services Platform',
    description: 'Discover AI tools, courses, research reports, and automation services. Build smarter with Dawra.',
}

export default async function HomePage() {
    const payload = await getPayloadClient()

    // Fetch featured content from CMS
    const posts = await payload.find({ collection: 'posts', limit: 3, sort: '-publishedAt', where: { status: { equals: 'published' } } })
    const tools = await payload.find({ collection: 'tools', limit: 4, where: { featured: { equals: true } } })
    const services = await payload.find({ collection: 'services', limit: 3 })

    return (
        <main className="min-h-screen">
            {/* Hero Section */}
            <section className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-zinc-900 dark:to-black py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-6xl mb-6">
                        Build smarter with <span className="text-blue-600 dark:text-blue-400">Dawra</span>
                    </h1>
                    <p className="mt-4 text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                        Your platform for AI tools, expert courses, research reports, and automation services.
                    </p>
                    <div className="mt-10 flex justify-center gap-4">
                        <Link href="/services" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-medium transition-colors">
                            Explore Services
                        </Link>
                        <Link href="/tools" className="bg-white dark:bg-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-700 text-gray-900 dark:text-white border border-gray-200 dark:border-zinc-700 px-8 py-3 rounded-lg font-medium transition-colors">
                            Browse AI Tools
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Tools */}
            <section className="py-20 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Featured AI Tools</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Discover our top recommended AI solutions.</p>
                        </div>
                        <Link href="/tools" className="text-blue-600 font-medium hover:underline hidden sm:block">View all tools &rarr;</Link>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {tools.docs.map((tool: any) => (
                            <Link key={tool.id} href={`/tools/${tool.slug}`} className="block border border-gray-200 dark:border-zinc-800 rounded-xl p-6 hover:shadow-lg transition-shadow">
                                <h3 className="font-semibold text-lg mb-2">{tool.name}</h3>
                                <p className="text-sm text-gray-500 mb-4 line-clamp-2">
                                    {/* Rich text will be properly parsed in the detail view, this is just a quick placeholder text */}
                                    Explore details for {tool.name}.
                                </p>
                                <div className="flex justify-between items-center text-sm font-medium">
                                    <span className="text-blue-600 capitalize">{tool.pricing}</span>
                                    <span className="text-yellow-500">★ {tool.rating || 'New'}</span>
                                </div>
                            </Link>
                        ))}
                        {tools.docs.length === 0 && (
                            <p className="text-gray-500 col-span-full">No featured tools available yet. Add some in the admin panel.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Latest Insights (Blog) */}
            <section className="py-20 bg-gray-50 dark:bg-zinc-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-end mb-10">
                        <div>
                            <h2 className="text-3xl font-bold tracking-tight">Latest Insights</h2>
                            <p className="text-gray-600 dark:text-gray-400 mt-2">Articles, tutorials, and AI updates.</p>
                        </div>
                        <Link href="/blog" className="text-blue-600 font-medium hover:underline hidden sm:block">View all posts &rarr;</Link>
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
                            <p className="text-gray-500 col-span-full">No posts published yet. Write your first post in the admin panel.</p>
                        )}
                    </div>
                </div>
            </section>

            {/* Services */}
            <section className="py-20 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight mb-4">Our Services</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        From comprehensive courses to custom AI integration. We help you leverage technology to grow.
                    </p>
                </div>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                    {services.docs.map((service: any) => (
                        <div key={service.id} className="text-center p-8 bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-2xl">
                            <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                            <p className="text-gray-600 dark:text-gray-400 mb-8 h-12">
                                {service.heroSection?.headline || 'Explore our expert offering and unlock new potential.'}
                            </p>
                            <Link href={`/services/${service.slug}`} className="inline-block bg-black dark:bg-white text-white dark:text-black font-semibold w-full py-3 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors">
                                Learn More
                            </Link>
                        </div>
                    ))}
                    {services.docs.length === 0 && (
                        <p className="text-gray-500 col-span-full text-center">No services listed yet.</p>
                    )}
                </div>
            </section>
        </main>
    )
}

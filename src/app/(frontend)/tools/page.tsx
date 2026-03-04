import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export const metadata: Metadata = {
    title: 'AI Tools Directory | Dawra',
    description: 'Curated directory of the best AI tools and services.',
}

export default async function ToolsListingPage() {
    const payload = await getPayloadClient()
    const tools = await payload.find({ collection: 'tools', limit: 100 })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">AI Tools Directory</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                    Discover, compare, and get the best deals on AI software for your business.
                </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {tools.docs.map((tool: any) => (
                    <div key={tool.id} className="border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 bg-white dark:bg-zinc-900 flex flex-col h-full hover:shadow-lg transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <h3 className="text-xl font-bold">{tool.name}</h3>
                            {tool.rating && <span className="inline-flex items-center text-sm font-medium text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded">★ {tool.rating}</span>}
                        </div>

                        <div className="mt-auto pt-6 border-t border-gray-100 dark:border-zinc-800 flex gap-3">
                            <Link href={`/tools/${tool.slug}`} className="flex-1 text-center font-medium bg-gray-100 dark:bg-zinc-800 hover:bg-gray-200 dark:hover:bg-zinc-700 py-2 rounded-lg transition-colors">
                                Read Review
                            </Link>
                            {(tool.affiliateLink || tool.websiteUrl) && (
                                <a href={tool.affiliateLink || tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="flex-1 text-center font-medium bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition-colors">
                                    Try Tool
                                </a>
                            )}
                        </div>
                    </div>
                ))}
                {tools.docs.length === 0 && (
                    <p className="text-gray-500 col-span-full">No tools added yet.</p>
                )}
            </div>
        </div>
    )
}

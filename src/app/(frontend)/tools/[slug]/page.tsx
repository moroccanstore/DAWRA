import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'tools',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const tool = result.docs[0] as any
    if (!tool) return { title: 'Tool Not Found' }

    return {
        title: `${tool.name} Review & Pricing`,
        description: `Read our comprehensive review of ${tool.name}.`,
    }
}

export default async function ToolDetailPage({ params }: Props) {
    const { slug } = await params
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'tools',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const tool = result.docs[0] as any
    if (!tool) notFound()

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 sm:p-12 shadow-sm mb-12">
                <div className="flex flex-col md:flex-row gap-8 items-start justify-between border-b border-gray-100 dark:border-zinc-800 pb-8 mb-8">
                    <div>
                        <div className="flex items-center gap-4 mb-4">
                            <h1 className="text-4xl font-extrabold tracking-tight">{tool.name}</h1>
                            {tool.rating && <span className="inline-flex flex-shrink-0 items-center text-lg font-medium text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 px-3 py-1 rounded-lg">★ {tool.rating}</span>}
                        </div>
                        {tool.category && (
                            <span className="text-sm font-semibold text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full uppercase tracking-wider">
                                {typeof tool.category === 'object' ? tool.category.name : 'Category'}
                            </span>
                        )}
                    </div>

                    <div className="flex flex-col gap-3 min-w-[200px]">
                        {(tool.affiliateLink || tool.websiteUrl) && (
                            <a href={tool.affiliateLink || tool.websiteUrl} target="_blank" rel="noopener noreferrer" className="block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-xl transition-colors shadow-sm shadow-blue-500/20">
                                Visit Website <span className="ml-1 text-blue-200">↗</span>
                            </a>
                        )}
                        <div className="text-center text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-zinc-800 py-3 rounded-xl border border-gray-100 dark:border-zinc-700">
                            <span className="capitalize">{tool.pricing}</span>
                            {tool.pricingDetails && <span className="block text-xs text-gray-500 font-normal mt-1">{tool.pricingDetails}</span>}
                        </div>
                    </div>
                </div>

                {/* Description Placeholder */}
                <div className="prose prose-lg dark:prose-invert max-w-none mb-12">
                    <p className="text-gray-500 italic border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 dark:bg-zinc-900 rounded-r-lg">
                        [Rich text description of {tool.name} goes here. Requires `@payloadcms/richtext-lexical/react` renderer.]
                    </p>
                </div>

                {/* Pros & Cons */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {tool.pros && tool.pros.length > 0 && (
                        <div className="bg-green-50 dark:bg-green-900/10 p-6 rounded-2xl border border-green-100 dark:border-green-900/30">
                            <h3 className="text-xl font-bold text-green-800 dark:text-green-400 mb-4 flex items-center gap-2"><span className="text-2xl">⊕</span> Pros</h3>
                            <ul className="space-y-3">
                                {tool.pros.map((p: any, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-green-900 dark:text-green-300">
                                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                        {p.pro}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {tool.cons && tool.cons.length > 0 && (
                        <div className="bg-red-50 dark:bg-red-900/10 p-6 rounded-2xl border border-red-100 dark:border-red-900/30">
                            <h3 className="text-xl font-bold text-red-800 dark:text-red-400 mb-4 flex items-center gap-2"><span className="text-2xl">⊖</span> Cons</h3>
                            <ul className="space-y-3">
                                {tool.cons.map((c: any, idx: number) => (
                                    <li key={idx} className="flex gap-3 text-red-900 dark:text-red-300">
                                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-red-500" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path></svg>
                                        {c.con}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            </div>

            <div className="text-center">
                <Link href="/tools" className="text-gray-500 hover:text-blue-600 font-medium transition-colors">
                    &larr; Back to all tools
                </Link>
            </div>
        </div>
    )
}

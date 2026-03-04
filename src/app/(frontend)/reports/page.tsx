import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export const metadata: Metadata = {
    title: 'Reports & Research | Dawra',
    description: 'In-depth industry reports on AI trends and automation strategies.',
}

export default async function ReportsListingPage() {
    const payload = await getPayloadClient()
    const reports = await payload.find({
        collection: 'reports',
        where: { status: { equals: 'published' } },
        sort: '-publishedAt'
    })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="mb-16">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Research & Reports</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
                    Deep-dive analysis on AI capabilities, market trends, and automation benchmarks.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {reports.docs.map((report: any) => (
                    <Link key={report.id} href={`/reports/${report.slug}`} className="group block border border-gray-200 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden hover:shadow-xl transition-all h-full flex flex-col">
                        <div className="p-8 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 mb-6">
                                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                <h3 className="text-xl font-bold group-hover:text-blue-600 transition-colors">{report.title}</h3>
                            </div>
                            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-1 line-clamp-3">{report.summary}</p>
                            <div className="flex items-center justify-between text-sm font-medium mt-auto border-t border-gray-100 dark:border-zinc-800 pt-6">
                                {report.publishedAt ? <span className="text-gray-500">{new Date(report.publishedAt).toLocaleDateString()}</span> : <span></span>}
                                {report.pdfDownload && <span className="text-blue-600 bg-blue-50 dark:bg-blue-900/20 px-3 py-1 rounded-full">PDF Available</span>}
                            </div>
                        </div>
                    </Link>
                ))}
                {reports.docs.length === 0 && (
                    <p className="text-gray-500 col-span-full">No reports published yet.</p>
                )}
            </div>
        </div>
    )
}

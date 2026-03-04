import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'
import { generatePageMetadata, generateJsonLd } from '@/lib/seo'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'reports',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const report = result.docs[0] as any
    if (!report) return { title: 'Report Not Found' }

    return generatePageMetadata({
        title: `${report.title} | Research by Dawra`,
        description: report.seo?.description || report.summary,
        path: `/reports/${slug}`,
        type: 'article',
        publishedAt: report.publishedAt,
        modifiedAt: report.updatedAt,
    })
}

export default async function ReportDetailPage({ params }: Props) {
    const { slug } = await params
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'reports',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const report = result.docs[0] as any
    if (!report) notFound()

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: generateJsonLd({
                        type: 'Article',
                        headline: report.title,
                        description: report.summary,
                        datePublished: report.publishedAt,
                        dateModified: report.updatedAt,
                        author: {
                            '@type': 'Organization',
                            name: 'Dawra',
                        },
                    }),
                }}
            />

            <Link href="/reports" className="text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 inline-block transition-colors">
                &larr; Back to Reports
            </Link>

            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm mb-12 relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-blue-50 dark:bg-blue-900/10 rounded-full blur-3xl opacity-50 mix-blend-multiply pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start justify-between border-b border-gray-100 dark:border-zinc-800 pb-8 mb-8">
                    <div>
                        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">{report.title}</h1>
                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-4">{report.summary}</p>
                        {report.publishedAt && <p className="text-sm text-gray-500 font-medium tracking-wide uppercase">Published {new Date(report.publishedAt).toLocaleDateString()}</p>}
                    </div>

                    {report.pdfDownload && typeof report.pdfDownload === 'object' && report.pdfDownload.url && (
                        <a href={report.pdfDownload.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 flex flex-col items-center justify-center p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900/30 rounded-2xl hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors min-w-[160px]">
                            <svg className="w-10 h-10 text-blue-600 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                            <span className="font-bold text-blue-700 dark:text-blue-300">Download PDF</span>
                        </a>
                    )}
                </div>

                {/* Full Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none relative z-10">
                    {report.content ? (
                        <p className="text-gray-500 italic border-l-4 border-gray-300 pl-4 py-2 bg-gray-50 dark:bg-black rounded-r-lg">
                            [Rich text report content goes here. Requires Lexical renderer.]
                        </p>
                    ) : (
                        <p className="text-gray-500 italic">No detailed content available. Please download the PDF report.</p>
                    )}
                </div>
            </div>

            {report.charts && report.charts.length > 0 && (
                <div className="mt-16">
                    <h2 className="text-2xl font-bold mb-8 text-center">Data & Charts</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {report.charts.map((chartDoc: any, idx: number) => {
                            const chart = typeof chartDoc.chartImage === 'object' ? chartDoc.chartImage : null;
                            if (!chart || !chart.url) return null;
                            return (
                                <div key={idx} className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-4 rounded-xl shadow-sm">
                                    <img src={chart.url} alt={chartDoc.caption || 'Report Chart'} className="w-full h-auto rounded-lg mb-4" />
                                    {chartDoc.caption && <p className="text-sm text-gray-500 font-medium text-center">{chartDoc.caption}</p>}
                                </div>
                            )
                        })}
                    </div>
                </div>
            )}
        </div>
    )
}

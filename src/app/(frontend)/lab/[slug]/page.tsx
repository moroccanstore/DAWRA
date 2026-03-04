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
        collection: 'lab-videos',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const video = result.docs[0] as any
    if (!video) return { title: 'Video Not Found' }

    return generatePageMetadata({
        title: `${video.title} | The Lab by Dawra`,
        description: video.seo?.description || `Watch this tutorial: ${video.title}`,
        path: `/lab/${slug}`,
        image: typeof video.thumbnail === 'object' && video.thumbnail?.url ? video.thumbnail.url : undefined,
        type: 'article',
        publishedAt: video.createdAt,
        modifiedAt: video.updatedAt,
    })
}

export default async function LabDetailPage({ params }: Props) {
    const { slug } = await params
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'lab-videos',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const video = result.docs[0] as any
    if (!video) notFound()

    // Make sure we have a valid video URL (assuming YouTube or similar)
    // Payload gives us a raw URL block usually. For an iframe, we need an embed URL.
    // This is a simple parser assuming standard YouTube URLs.
    let embedUrl = video.videoUrl
    if (embedUrl?.includes('youtube.com/watch?v=')) {
        embedUrl = embedUrl.replace('youtube.com/watch?v=', 'youtube.com/embed/')
        // Handle ampersands in URL like &t=10s
        if (embedUrl.includes('&')) embedUrl = embedUrl.split('&')[0]
    } else if (embedUrl?.includes('youtu.be/')) {
        embedUrl = embedUrl.replace('youtu.be/', 'youtube.com/embed/')
    }

    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: generateJsonLd({
                        type: 'VideoObject',
                        name: video.title,
                        description: video.seo?.description || `Watch this tutorial: ${video.title}`,
                        thumbnailUrl: typeof video.thumbnail === 'object' && video.thumbnail?.url ? video.thumbnail.url : 'https://dawra.live/default-thumbnail.jpg',
                        uploadDate: video.createdAt,
                        embedUrl: embedUrl || '',
                    }),
                }}
            />

            <Link href="/lab" className="text-sm font-medium text-gray-500 hover:text-blue-600 mb-8 inline-block transition-colors">
                &larr; Back to Lab
            </Link>

            <div className="mb-8">
                <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">{video.title}</h1>
                <div className="flex items-center text-sm text-gray-500 gap-4">
                    {video.createdAt && <span>Added {new Date(video.createdAt).toLocaleDateString()}</span>}
                    {video.duration && <span className="bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded font-medium">{video.duration}</span>}
                </div>
            </div>

            {embedUrl ? (
                <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg border border-gray-200 dark:border-zinc-800 bg-black mb-12">
                    <iframe
                        src={embedUrl}
                        title={video.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                    ></iframe>
                </div>
            ) : (
                <div className="aspect-video w-full rounded-2xl bg-gray-100 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 flex items-center justify-center mb-12">
                    <p className="text-gray-500">Video URL not provided or unsupported format.</p>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 prose prose-lg dark:prose-invert max-w-none">
                    <h2 className="text-2xl font-bold mb-6">Transcript & Notes</h2>
                    <div className="bg-gray-50 dark:bg-zinc-900/50 p-6 md:p-8 rounded-2xl border border-gray-100 dark:border-zinc-800">
                        {video.transcript ? (
                            <p className="text-gray-500 italic border-l-4 border-gray-300 pl-4 py-2 bg-white dark:bg-zinc-900 rounded-r-lg">
                                [Rich text transcript goes here. Requires Lexical renderer.]
                            </p>
                        ) : (
                            <p className="text-gray-500 italic">No notes provided for this video.</p>
                        )}
                    </div>
                </div>

                <div className="lg:col-span-1">
                    {video.toolsUsed && video.toolsUsed.length > 0 && (
                        <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-6 sticky top-24">
                            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                                <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                Tools Used
                            </h3>
                            <ul className="space-y-3">
                                {video.toolsUsed.map((tool: any, idx: number) => {
                                    // Handle whether the relationship is populated or just an ID
                                    const toolDoc = typeof tool === 'object' ? tool : null;
                                    return toolDoc ? (
                                        <li key={idx}>
                                            <Link href={`/tools/${toolDoc.slug}`} className="flex items-center justify-between group p-3 rounded-lg border border-gray-100 dark:border-zinc-800 hover:border-blue-200 dark:hover:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-900/10 transition-colors">
                                                <span className="font-medium">{toolDoc.name}</span>
                                                <span className="text-gray-400 group-hover:text-blue-600 group-hover:translate-x-1 transition-all">&rarr;</span>
                                            </Link>
                                        </li>
                                    ) : (
                                        <li key={idx} className="text-gray-500">Tool Ref ID: {tool}</li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export const metadata: Metadata = {
    title: 'Lab Videos | Dawra',
    description: 'AI tutorials, experiments, and step-by-step guides.',
}

export default async function LabListingPage() {
    const payload = await getPayloadClient()
    const videos = await payload.find({ collection: 'lab-videos', sort: '-createdAt' })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="mb-12">
                <h1 className="text-4xl font-bold tracking-tight mb-4">The Lab</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400">Step-by-step AI tutorials and experimental workflows.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {videos.docs.map((video: any) => (
                    <Link key={video.id} href={`/lab/${video.slug}`} className="group block h-full bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden hover:shadow-xl transition-shadow flex flex-col">
                        <div className="aspect-video bg-gray-100 dark:bg-black relative overflow-hidden">
                            {video.thumbnail && typeof video.thumbnail === 'object' && video.thumbnail.url ? (
                                <img src={video.thumbnail.url} alt={video.thumbnail.alt || video.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                            ) : (
                                <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                                    <svg className="w-12 h-12" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                </div>
                            )}
                            {video.duration && (
                                <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                                    {video.duration}
                                </div>
                            )}
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                            <h3 className="text-lg font-bold mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">{video.title}</h3>
                            <div className="flex items-center text-xs text-gray-500 gap-4 mt-auto pt-4 border-t border-gray-100 dark:border-zinc-800">
                                {video.createdAt && <span>{new Date(video.createdAt).toLocaleDateString()}</span>}
                            </div>
                        </div>
                    </Link>
                ))}
                {videos.docs.length === 0 && (
                    <p className="text-gray-500 col-span-full">No videos available yet.</p>
                )}
            </div>
        </div>
    )
}

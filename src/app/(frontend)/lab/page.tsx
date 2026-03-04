import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Lab',
    description: 'Explore AI-generated content — UGC videos, experiments, and creative showcases.',
}

export default function LabPage() {
    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">AI Lab</h1>
            <p className="text-gray-600 dark:text-gray-400">Lab content coming soon.</p>
        </main>
    )
}

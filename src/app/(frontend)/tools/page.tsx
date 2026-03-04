import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Tools Directory',
    description: 'Curated directory of the best AI tools — reviewed, ranked, and compared.',
}

export default function ToolsPage() {
    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">AI Tools Directory</h1>
            <p className="text-gray-600 dark:text-gray-400">Tools directory coming soon.</p>
        </main>
    )
}

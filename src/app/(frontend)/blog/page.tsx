import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Blog',
    description: 'Latest articles on AI tools, automation, and digital transformation.',
}

export default function BlogPage() {
    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Blog</h1>
            <p className="text-gray-600 dark:text-gray-400">Articles coming soon.</p>
        </main>
    )
}

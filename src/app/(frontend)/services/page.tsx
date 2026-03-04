import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Services',
    description: 'AI-powered services — courses, consulting, and automation solutions.',
}

export default function ServicesPage() {
    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Services</h1>
            <p className="text-gray-600 dark:text-gray-400">Services coming soon.</p>
        </main>
    )
}

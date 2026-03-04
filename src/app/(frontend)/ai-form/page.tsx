import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'AI Consultation Form',
    description: 'Request a free AI consultation — tell us about your needs and our team will follow up.',
}

export default function AIFormPage() {
    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">AI Consultation</h1>
            <p className="text-gray-600 dark:text-gray-400">Consultation form coming soon.</p>
        </main>
    )
}

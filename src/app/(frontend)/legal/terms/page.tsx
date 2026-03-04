import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'Dawra terms of service — rules and conditions for using our platform.',
}

export default function TermsPage() {
    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <p className="text-gray-600 dark:text-gray-400">Terms content will be loaded from CMS.</p>
        </main>
    )
}

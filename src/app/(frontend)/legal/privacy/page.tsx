import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'Dawra privacy policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">Privacy policy content will be loaded from CMS.</p>
        </main>
    )
}

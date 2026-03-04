import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Refund Policy',
    description: 'Dawra refund policy — our commitment to fair refund practices.',
}

export default function RefundPage() {
    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Refund Policy</h1>
            <p className="text-gray-600 dark:text-gray-400">Refund policy content will be loaded from CMS.</p>
        </main>
    )
}

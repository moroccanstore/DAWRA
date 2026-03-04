import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dashboard',
    description: 'Your personal dashboard — manage your account and access premium content.',
}

export default function DashboardPage() {
    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400">Dashboard coming soon. Authentication required.</p>
        </main>
    )
}

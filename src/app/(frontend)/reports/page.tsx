import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Research Reports',
    description: 'In-depth AI research reports — market analysis, trends, and data-driven insights.',
}

export default function ReportsPage() {
    return (
        <main className="min-h-screen p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Research Reports</h1>
            <p className="text-gray-600 dark:text-gray-400">Reports coming soon.</p>
        </main>
    )
}

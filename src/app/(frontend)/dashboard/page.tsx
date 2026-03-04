import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Dashboard | Dawra',
    description: 'Manage your services and account.',
}

export default function DashboardPage() {
    return (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <div className="border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-12 rounded-3xl shadow-sm text-center max-w-2xl mx-auto">
                <svg className="w-16 h-16 text-blue-600 mx-auto mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <h1 className="text-3xl font-extrabold tracking-tight mb-4">Client Dashboard</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">
                    The dashboard is currently under construction. Phase 5 of the rebuild will introduce authentication, user roles, and a personalized dashboard for managing courses and services.
                </p>
                <Link href="/" className="inline-block bg-black dark:bg-white text-white dark:text-black font-medium px-8 py-3 rounded-lg hover:-translate-y-1 transition-transform">
                    Return Home
                </Link>
            </div>
        </div>
    )
}

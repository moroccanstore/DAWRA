import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Dawra — AI Content & Services Platform',
    description: 'Discover AI tools, courses, research reports, and automation services. Build smarter with Dawra.',
}

export default function HomePage() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center p-8">
            <h1 className="text-4xl font-bold mb-4">Dawra</h1>
            <p className="text-xl text-gray-600 dark:text-gray-400 text-center max-w-2xl">
                AI Content &amp; Services Platform
            </p>
            <p className="mt-4 text-gray-500 dark:text-gray-500 text-sm">
                Coming soon — under construction
            </p>
        </main>
    )
}

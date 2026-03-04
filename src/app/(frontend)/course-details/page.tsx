import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Course Details',
    description: 'Explore our AI course curriculum, pricing, and enrollment details.',
}

export default function CourseDetailsPage() {
    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Course Details</h1>
            <p className="text-gray-600 dark:text-gray-400">Course details coming soon.</p>
        </main>
    )
}

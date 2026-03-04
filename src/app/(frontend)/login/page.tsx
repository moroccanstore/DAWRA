import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Login',
    description: 'Sign in to your Dawra account.',
}

export default function LoginPage() {
    return (
        <main className="min-h-screen flex items-center justify-center p-8">
            <div className="w-full max-w-md">
                <h1 className="text-3xl font-bold mb-6 text-center">Login</h1>
                <p className="text-gray-600 dark:text-gray-400 text-center">
                    Authentication will be implemented in Phase 5.
                </p>
            </div>
        </main>
    )
}

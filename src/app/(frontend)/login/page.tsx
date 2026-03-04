import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Log In | Dawra',
    description: 'Sign in to access your dashboard, courses, and reports.',
}

export default function LoginPage() {
    return (
        <div className="max-w-md mx-auto px-4 sm:px-6 py-32 min-h-screen">
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 sm:p-10 shadow-lg relative">
                <h1 className="text-2xl font-bold text-center mb-8">Welcome back</h1>
                <form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Email address</label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex justify-between items-center mb-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                            <Link href="/forgot-password" className="text-sm text-blue-600 hover:underline">Forgot password?</Link>
                        </div>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-zinc-700 bg-white dark:bg-black focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-shadow outline-none"
                            placeholder="••••••••"
                            required
                        />
                    </div>
                    <button
                        type="button"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors cursor-not-allowed opacity-80"
                    >
                        Sign In (Phase 5 Auth Pending)
                    </button>
                </form>
                <p className="mt-8 text-center text-sm text-gray-500">
                    Don't have an account? <Link href="/register" className="text-blue-600 font-medium hover:underline">Sign up</Link>
                </p>
            </div>
        </div>
    )
}

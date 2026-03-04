import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Terms of Service | Dawra',
    description: 'Terms and Conditions for using the Dawra platform.',
}

export default function TermsPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">Terms of Service</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
                <p>Please read these Terms of Service carefully before using Dawra.</p>

                <h2>1. Acceptance of Terms</h2>
                <p>By accessing or using our platform, you agree to be bound by these Terms. If you disagree with any part of the terms, then you may not access the service.</p>

                <h2>2. Intellectual Property</h2>
                <p>The Service and its original content, features, and functionality are and will remain the exclusive property of Dawra and its licensors.</p>

                <h2>3. Usage Limitations</h2>
                <p>You agree not to reproduce, duplicate, copy, sell, resell or exploit any portion of the Service, use of the Service, or access to the Service without express written permission by us.</p>

                <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg mt-8 border border-gray-200 dark:border-zinc-800">
                    <em>Note: This is a placeholder for the migrated static terms of service.</em>
                </div>
            </div>
        </div>
    )
}

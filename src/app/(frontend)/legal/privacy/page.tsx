import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Privacy Policy | Dawra',
    description: 'Privacy Policy and Data Protection guidelines.',
}

export default function PrivacyPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">Privacy Policy</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
                <p>
                    At Dawra, we are committed to protecting your privacy and ensuring the security of your personal information.
                    This Privacy Policy outlines how we collect, use, and safeguard the data you provide to us.
                </p>
                <h2>1. Information We Collect</h2>
                <p>We may collect personal information such as your name, email address, and billing details when you register for an account, subscribe to our newsletter, or purchase our services.</p>

                <h2>2. How We Use Your Data</h2>
                <p>Your data is primarily used to provide you with the services you requested, process payments, and communicate important updates regarding the platform.</p>

                <h2>3. Data Protection</h2>
                <p>We implement strict security protocols to prevent unauthorized access, alteration, or disclosure of your personal data.</p>

                <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg mt-8 border border-gray-200 dark:border-zinc-800">
                    <em>Note: This is a placeholder for the migrated static privacy terms.</em>
                </div>
            </div>
        </div>
    )
}

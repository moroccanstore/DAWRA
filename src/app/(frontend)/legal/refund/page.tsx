import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Refund Policy | Dawra',
    description: 'Information regarding refunds and cancellations.',
}

export default function RefundPolicyPage() {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 min-h-screen">
            <h1 className="text-4xl font-extrabold tracking-tight mb-8">Refund Policy</h1>
            <div className="prose prose-lg dark:prose-invert max-w-none">
                <p><strong>Last Updated: {new Date().toLocaleDateString()}</strong></p>
                <p>At Dawra, we strive to ensure 100% satisfaction with our digital products and services.</p>

                <h2>1. Digital Products and Courses</h2>
                <p>Due to the immediate access nature of digital courses and reports, we generally do not offer refunds once a purchase is completed. However, exceptional circumstances are reviewed on a case-by-case basis.</p>

                <h2>2. Automation and Consulting Services</h2>
                <p>Refunds for consulting or custom automation services are subject to the specific terms outlined in your service agreement. Generally, no refunds are provided for work already performed.</p>

                <h2>3. Requesting a Review</h2>
                <p>If you believe you have a valid reason for a refund, please contact our support team within 14 days of purchase detailing your concern.</p>

                <div className="bg-gray-50 dark:bg-zinc-900 p-6 rounded-lg mt-8 border border-gray-200 dark:border-zinc-800">
                    <em>Note: This is a placeholder for the migrated static refund policy.</em>
                </div>
            </div>
        </div>
    )
}

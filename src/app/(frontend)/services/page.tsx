import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export const metadata: Metadata = {
    title: 'Services | Dawra',
    description: 'AI Consultation, courses, and custom automation services.',
}

export default async function ServicesListingPage() {
    const payload = await getPayloadClient()
    const services = await payload.find({ collection: 'services' })

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="mb-16 text-center">
                <h1 className="text-4xl font-extrabold tracking-tight mb-4">Our Services</h1>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    Expert solutions spanning AI integration, hands-on courses, and custom automation.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {services.docs.map((service: any) => (
                    <Link key={service.id} href={`/services/${service.slug}`} className="block border border-gray-200 dark:border-zinc-800 rounded-2xl p-8 hover:shadow-xl transition-all group bg-white dark:bg-zinc-900">
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-600 transition-colors">{service.title}</h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-8 line-clamp-3">
                            {service.heroSection?.headline || 'Detailed service offering available inside.'}
                        </p>
                        <div className="text-blue-600 font-medium flex items-center">
                            Learn more <span className="ml-2 group-hover:translate-x-1 transition-transform">&rarr;</span>
                        </div>
                    </Link>
                ))}
                {services.docs.length === 0 && (
                    <p className="text-gray-500 col-span-full text-center">No services available at the moment.</p>
                )}
            </div>
        </div>
    )
}

import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'
import { generatePageMetadata, generateJsonLd } from '@/lib/seo'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    const payload = await getPayloadClient()
    const result = await payload.find({
        collection: 'services',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const service = result.docs[0] as any
    if (!service) return { title: 'Service Not Found' }

    return generatePageMetadata({
        title: service.seo?.title || service.title,
        description: service.seo?.description || service.heroSection?.headline,
        path: `/services/${slug}`,
        type: 'website',
        modifiedAt: service.updatedAt,
    })
}

export default async function ServiceDetailPage({ params }: Props) {
    const { slug } = await params
    const payload = await getPayloadClient()

    const result = await payload.find({
        collection: 'services',
        where: { slug: { equals: slug } },
        limit: 1,
    })

    const service = result.docs[0] as any
    if (!service) notFound()

    return (
        <div className="min-h-screen">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: generateJsonLd({
                        type: 'Product', // Also acceptable for services
                        name: service.title,
                        description: service.heroSection?.headline || service.seo?.description,
                        brand: {
                            '@type': 'Brand',
                            name: 'Dawra',
                        },
                    }),
                }}
            />

            {/* Hero */}
            <section className="bg-gray-50 dark:bg-zinc-900 py-24 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">{service.title}</h1>
                    <h2 className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-10">
                        {service.heroSection?.headline}
                    </h2>
                    {service.heroSection?.ctaLink && (
                        <Link href={service.heroSection.ctaLink} className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium px-8 py-3 rounded-lg transition-colors text-lg">
                            {service.heroSection.ctaLabel || 'Get Started'}
                        </Link>
                    )}
                </div>
            </section>

            {/* Benefits */}
            {service.benefits && service.benefits.length > 0 && (
                <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center mb-16">Key Benefits</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {service.benefits.map((benefit: any, idx: number) => (
                            <div key={idx} className="bg-white dark:bg-black p-8 rounded-2xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                                {benefit.icon && <div className="text-4xl mb-4">{benefit.icon}</div>}
                                <h4 className="text-xl font-bold mb-3">{benefit.title}</h4>
                                <p className="text-gray-600 dark:text-gray-400">{benefit.description}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* Pricing */}
            {service.pricing && service.pricing.length > 0 && (
                <section className="bg-gray-50 dark:bg-zinc-900 py-20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h3 className="text-3xl font-bold text-center mb-16">Pricing Plans</h3>
                        <div className="flex flex-wrap justify-center gap-8">
                            {service.pricing.map((plan: any, idx: number) => (
                                <div key={idx} className={`w-full max-w-sm rounded-2xl p-8 bg-white dark:bg-black border ${plan.highlighted ? 'border-blue-500 shadow-xl shadow-blue-500/10 scale-105 relative' : 'border-gray-200 dark:border-zinc-800'}`}>
                                    {plan.highlighted && <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">Recommended</div>}
                                    <h4 className="text-xl font-semibold mb-2">{plan.planName}</h4>
                                    <div className="text-4xl font-extrabold mb-8">{plan.price}</div>
                                    <ul className="space-y-4 mb-8">
                                        {(plan.features || []).map((feat: any, fIdx: number) => (
                                            <li key={fIdx} className="flex gap-3 text-gray-600 dark:text-gray-400">
                                                <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                                                {feat.feature}
                                            </li>
                                        ))}
                                    </ul>
                                    {service.heroSection?.ctaLink && (
                                        <Link href={service.heroSection.ctaLink} className={`block w-full text-center py-3 rounded-lg font-medium transition-colors ${plan.highlighted ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-gray-100 hover:bg-gray-200 dark:bg-zinc-800 dark:hover:bg-zinc-700'}`}>
                                            {service.heroSection.ctaLabel || 'Choose Plan'}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            {/* FAQ */}
            {service.faq && service.faq.length > 0 && (
                <section className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h3>
                    <div className="space-y-6">
                        {service.faq.map((item: any, idx: number) => (
                            <div key={idx} className="border-b border-gray-200 dark:border-zinc-800 pb-6">
                                <h4 className="text-lg font-bold mb-2">{item.question}</h4>
                                <p className="text-gray-600 dark:text-gray-400">{item.answer}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    )
}

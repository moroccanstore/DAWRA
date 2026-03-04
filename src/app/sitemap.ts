import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dawra.live'

/**
 * Dynamic sitemap generator.
 * Currently returns static routes.
 * In Phase 2+, this will query Payload CMS for all published content.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date().toISOString()

    // Static routes
    const staticRoutes: MetadataRoute.Sitemap = [
        {
            url: SITE_URL,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 1,
        },
        {
            url: `${SITE_URL}/blog`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/services`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_URL}/tools`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${SITE_URL}/lab`,
            lastModified: now,
            changeFrequency: 'weekly',
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/reports`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
        {
            url: `${SITE_URL}/login`,
            lastModified: now,
            changeFrequency: 'monthly',
            priority: 0.5,
        },
        {
            url: `${SITE_URL}/legal/privacy`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/legal/terms`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
        {
            url: `${SITE_URL}/legal/refund`,
            lastModified: now,
            changeFrequency: 'yearly',
            priority: 0.3,
        },
    ]

    // TODO: Phase 2+ — Query Payload CMS for dynamic routes
    // const payload = await getPayloadClient()
    // const posts = await payload.find({ collection: 'posts', where: { status: { equals: 'published' } } })
    // const dynamicRoutes = posts.docs.map(post => ({ url: `${SITE_URL}/blog/${post.slug}`, ... }))

    return [...staticRoutes]
}

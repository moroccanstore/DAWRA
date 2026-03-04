import type { MetadataRoute } from 'next'
import { getPayloadClient } from '@/lib/payloadClient'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dawra.live'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const now = new Date().toISOString()

    // 1. Static Routes
    const staticRoutes: MetadataRoute.Sitemap = [
        { url: SITE_URL, lastModified: now, changeFrequency: 'weekly', priority: 1 },
        { url: `${SITE_URL}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
        { url: `${SITE_URL}/tools`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
        { url: `${SITE_URL}/lab`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
        { url: `${SITE_URL}/reports`, lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    ]

    // 2. Dynamic Routes from Payload CMS
    const payload = await getPayloadClient()

    // Fetch active posts
    const posts = await payload.find({ collection: 'posts', where: { status: { equals: 'published' } }, limit: 1000 })
    const postRoutes: MetadataRoute.Sitemap = posts.docs.map(post => ({
        url: `${SITE_URL}/blog/${post.slug}`,
        lastModified: post.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    // Fetch services
    const services = await payload.find({ collection: 'services', limit: 100 })
    const serviceRoutes: MetadataRoute.Sitemap = services.docs.map(service => ({
        url: `${SITE_URL}/services/${service.slug}`,
        lastModified: service.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.8,
    }))

    // Fetch tools
    const tools = await payload.find({ collection: 'tools', limit: 1000 })
    const toolRoutes: MetadataRoute.Sitemap = tools.docs.map(tool => ({
        url: `${SITE_URL}/tools/${tool.slug}`,
        lastModified: tool.updatedAt,
        changeFrequency: 'weekly',
        priority: 0.8,
    }))

    // Fetch lab videos
    const videos = await payload.find({ collection: 'lab-videos', limit: 1000 })
    const videoRoutes: MetadataRoute.Sitemap = videos.docs.map(video => ({
        url: `${SITE_URL}/lab/${video.slug}`,
        lastModified: video.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.6,
    }))

    // Fetch reports
    const reports = await payload.find({ collection: 'reports', where: { status: { equals: 'published' } }, limit: 1000 })
    const reportRoutes: MetadataRoute.Sitemap = reports.docs.map(report => ({
        url: `${SITE_URL}/reports/${report.slug}`,
        lastModified: report.updatedAt,
        changeFrequency: 'monthly',
        priority: 0.7,
    }))

    return [
        ...staticRoutes,
        ...postRoutes,
        ...serviceRoutes,
        ...toolRoutes,
        ...videoRoutes,
        ...reportRoutes,
    ]
}

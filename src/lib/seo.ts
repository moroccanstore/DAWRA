import type { Metadata } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://dawra.live'
const SITE_NAME = 'Dawra'
const DEFAULT_DESCRIPTION = 'AI content and services platform — tools, courses, reports, and automation.'

interface SEOInput {
    title: string
    description?: string
    path?: string
    image?: string
    type?: 'website' | 'article'
    publishedAt?: string
    modifiedAt?: string
}

/**
 * Generates Next.js Metadata object for a page.
 * Used in generateMetadata() functions across all routes.
 */
export function generatePageMetadata({
    title,
    description = DEFAULT_DESCRIPTION,
    path = '',
    image,
    type = 'website',
    publishedAt,
    modifiedAt,
}: SEOInput): Metadata {
    const url = `${SITE_URL}${path}`
    const fullTitle = path === '' ? title : `${title} | ${SITE_NAME}`

    return {
        title: fullTitle,
        description,
        metadataBase: new URL(SITE_URL),
        alternates: {
            canonical: url,
        },
        openGraph: {
            title: fullTitle,
            description,
            url,
            siteName: SITE_NAME,
            type,
            ...(image && { images: [{ url: image, width: 1200, height: 630 }] }),
            ...(publishedAt && { publishedTime: publishedAt }),
            ...(modifiedAt && { modifiedTime: modifiedAt }),
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description,
            ...(image && { images: [image] }),
        },
    }
}

/**
 * Generates JSON-LD structured data for a page.
 */
export function generateJsonLd(data: {
    type: 'WebSite' | 'Article' | 'BreadcrumbList' | 'Organization' | 'Product' | 'SoftwareApplication' | 'VideoObject'
    [key: string]: unknown
}): string {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': data.type,
        ...data,
    })
}

/**
 * Generates breadcrumb JSON-LD from an array of path segments.
 */
export function generateBreadcrumbs(
    items: Array<{ name: string; path: string }>
): string {
    return JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.path}`,
        })),
    })
}

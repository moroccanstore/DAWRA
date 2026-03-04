import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        reactCompiler: false,
    },
    async redirects() {
        return [
            // === SEO REDIRECT SYSTEM ===
            // Preserving old indexed URLs with 301 permanent redirects

            // Login
            {
                source: '/login.html',
                destination: '/login',
                permanent: true,
            },

            // Tools
            {
                source: '/pages/tools/AItoolsdirectoryv2.html',
                destination: '/tools',
                permanent: true,
            },
            {
                source: '/pages/tools/AIToolsDirectory.html',
                destination: '/tools',
                permanent: true,
            },
            {
                source: '/pages/tools/AIStyleBank.html',
                destination: '/tools/ai-style-bank',
                permanent: true,
            },

            // Services / Courses
            {
                source: '/pages/tools/premium-course-ai.html',
                destination: '/services/premium-course-ai',
                permanent: true,
            },
            {
                source: '/pages/tools/premium-course-ai-ecom.html',
                destination: '/services/premium-course-ai-ecom',
                permanent: true,
            },

            // Forms (standalone pages)
            {
                source: '/pages/forms/AIform.html',
                destination: '/ai-form',
                permanent: true,
            },
            {
                source: '/pages/forms/coursedetailes.html',
                destination: '/course-details',
                permanent: true,
            },

            // Legal
            {
                source: '/pages/legal/privacy.html',
                destination: '/legal/privacy',
                permanent: true,
            },
            {
                source: '/pages/legal/terms.html',
                destination: '/legal/terms',
                permanent: true,
            },
            {
                source: '/pages/legal/refund.html',
                destination: '/legal/refund',
                permanent: true,
            },
        ]
    },
}

export default withPayload(nextConfig)

import type { GlobalConfig } from 'payload'

export const SiteSettings: GlobalConfig = {
    slug: 'site-settings',
    label: 'Site Settings',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'siteName',
            type: 'text',
            required: true,
            defaultValue: 'Dawra',
        },
        {
            name: 'siteDescription',
            type: 'textarea',
            defaultValue: 'AI content and services platform',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'favicon',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'socialLinks',
            type: 'group',
            label: 'Social Media',
            fields: [
                { name: 'twitter', type: 'text' },
                { name: 'linkedin', type: 'text' },
                { name: 'youtube', type: 'text' },
                { name: 'instagram', type: 'text' },
                { name: 'tiktok', type: 'text' },
            ],
        },
        {
            name: 'analytics',
            type: 'group',
            label: 'Analytics',
            fields: [
                {
                    name: 'googleAnalyticsId',
                    type: 'text',
                    label: 'Google Analytics ID',
                    admin: { description: 'e.g. G-XXXXXXXXXX' },
                },
            ],
        },
    ],
}

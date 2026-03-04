import type { CollectionConfig } from 'payload'
import { generateSlug } from '@/hooks/generateSlug'

export const LabVideos: CollectionConfig = {
    slug: 'lab-videos',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'createdAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'title',
            type: 'text',
            required: true,
        },
        {
            name: 'slug',
            type: 'text',
            required: true,
            unique: true,
            admin: {
                position: 'sidebar',
            },
            hooks: {
                beforeValidate: [generateSlug('title')],
            },
        },
        {
            name: 'videoURL',
            type: 'text',
            required: true,
            label: 'Video URL',
            admin: {
                description: 'YouTube, Vimeo, or direct video URL.',
            },
        },
        {
            name: 'thumbnail',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'transcript',
            type: 'richText',
            admin: {
                description: 'Full video transcript for SEO.',
            },
        },
        {
            name: 'toolsUsed',
            type: 'relationship',
            relationTo: 'tools',
            hasMany: true,
            admin: {
                description: 'AI tools featured in this video.',
            },
        },
        {
            name: 'duration',
            type: 'text',
            admin: {
                position: 'sidebar',
                description: 'e.g. "3:45"',
            },
        },
        // --- SEO ---
        {
            name: 'seo',
            type: 'group',
            label: 'SEO',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    label: 'SEO Title',
                },
                {
                    name: 'description',
                    type: 'textarea',
                    label: 'SEO Description',
                },
            ],
        },
    ],
}

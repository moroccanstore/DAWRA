import type { CollectionConfig } from 'payload'
import { generateSlug } from '@/hooks/generateSlug'

export const Reports: CollectionConfig = {
    slug: 'reports',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'status', 'publishedAt'],
    },
    access: {
        read: () => true,
    },
    versions: {
        drafts: true,
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
            name: 'summary',
            type: 'richText',
            admin: {
                description: 'Executive summary shown on listing pages.',
            },
        },
        {
            name: 'content',
            type: 'richText',
            admin: {
                description: 'Full report content.',
            },
        },
        {
            name: 'pdf',
            type: 'upload',
            relationTo: 'media',
            admin: {
                description: 'Downloadable PDF version.',
            },
        },
        {
            name: 'coverImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'charts',
            type: 'array',
            admin: {
                description: 'Data visualizations / chart images.',
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                    required: true,
                },
                {
                    name: 'caption',
                    type: 'text',
                },
            ],
        },
        // --- Publishing ---
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'publishedAt',
            type: 'date',
            admin: {
                position: 'sidebar',
                date: {
                    pickerAppearance: 'dayAndTime',
                },
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

import type { CollectionConfig } from 'payload'
import { generateSlug } from '@/hooks/generateSlug'
import { computeReadingTime } from '@/hooks/computeReadingTime'

export const Posts: CollectionConfig = {
    slug: 'posts',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'category', 'status', 'publishedAt'],
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
            name: 'excerpt',
            type: 'textarea',
            admin: {
                description: 'Short summary for listings and SEO.',
            },
        },
        {
            name: 'content',
            type: 'richText',
            required: true,
        },
        {
            name: 'featuredImage',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'category',
            type: 'relationship',
            relationTo: 'categories',
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'tags',
            type: 'array',
            admin: {
                position: 'sidebar',
            },
            fields: [
                {
                    name: 'tag',
                    type: 'text',
                    required: true,
                },
            ],
        },
        // --- SEO Fields ---
        {
            name: 'seo',
            type: 'group',
            label: 'SEO',
            admin: {
                description: 'Override auto-generated SEO values.',
            },
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
        // --- Publishing ---
        {
            name: 'status',
            type: 'select',
            defaultValue: 'draft',
            options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Published', value: 'published' },
                { label: 'Archived', value: 'archived' },
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
        {
            name: 'readingTime',
            type: 'number',
            admin: {
                position: 'sidebar',
                readOnly: true,
                description: 'Auto-computed (minutes).',
            },
            hooks: {
                beforeChange: [computeReadingTime],
            },
        },
        // --- Relationships (internal linking) ---
        {
            name: 'relatedPosts',
            type: 'relationship',
            relationTo: 'posts',
            hasMany: true,
            admin: {
                description: 'Link to related blog posts.',
            },
        },
        {
            name: 'relatedTools',
            type: 'relationship',
            relationTo: 'tools',
            hasMany: true,
            admin: {
                description: 'AI tools referenced in this post.',
            },
        },
        {
            name: 'relatedServices',
            type: 'relationship',
            relationTo: 'services',
            hasMany: true,
            admin: {
                description: 'Services referenced in this post.',
            },
        },
    ],
}

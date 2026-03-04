import type { CollectionConfig } from 'payload'
import { generateSlug } from '@/hooks/generateSlug'

export const Services: CollectionConfig = {
    slug: 'services',
    admin: {
        useAsTitle: 'title',
        defaultColumns: ['title', 'slug', 'updatedAt'],
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
        // --- Hero Section ---
        {
            name: 'heroSection',
            type: 'group',
            label: 'Hero Section',
            fields: [
                {
                    name: 'headline',
                    type: 'text',
                },
                {
                    name: 'subheadline',
                    type: 'textarea',
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'ctaLabel',
                    type: 'text',
                    label: 'CTA Button Text',
                    defaultValue: 'Get Started',
                },
                {
                    name: 'ctaLink',
                    type: 'text',
                    label: 'CTA Button Link',
                },
            ],
        },
        {
            name: 'description',
            type: 'richText',
        },
        // --- Benefits ---
        {
            name: 'benefits',
            type: 'array',
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'description',
                    type: 'textarea',
                },
                {
                    name: 'icon',
                    type: 'text',
                    admin: {
                        description: 'Icon name or emoji.',
                    },
                },
            ],
        },
        // --- Pricing ---
        {
            name: 'pricing',
            type: 'array',
            fields: [
                {
                    name: 'planName',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'price',
                    type: 'text',
                    required: true,
                    admin: {
                        description: 'e.g. "$49/mo" or "Free"',
                    },
                },
                {
                    name: 'features',
                    type: 'array',
                    fields: [
                        {
                            name: 'feature',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
                {
                    name: 'highlighted',
                    type: 'checkbox',
                    defaultValue: false,
                    admin: {
                        description: 'Highlight this plan as recommended.',
                    },
                },
            ],
        },
        // --- FAQ ---
        {
            name: 'faq',
            type: 'array',
            label: 'FAQ',
            fields: [
                {
                    name: 'question',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'answer',
                    type: 'textarea',
                    required: true,
                },
            ],
        },
        // --- Testimonials ---
        {
            name: 'testimonials',
            type: 'array',
            fields: [
                {
                    name: 'name',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'role',
                    type: 'text',
                },
                {
                    name: 'quote',
                    type: 'textarea',
                    required: true,
                },
                {
                    name: 'avatar',
                    type: 'upload',
                    relationTo: 'media',
                },
            ],
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

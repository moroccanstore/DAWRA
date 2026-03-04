import type { CollectionConfig } from 'payload'
import { generateSlug } from '@/hooks/generateSlug'

export const Tools: CollectionConfig = {
    slug: 'tools',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'category', 'pricing', 'updatedAt'],
    },
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'name',
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
                beforeValidate: [generateSlug('name')],
            },
        },
        {
            name: 'description',
            type: 'richText',
        },
        {
            name: 'logo',
            type: 'upload',
            relationTo: 'media',
        },
        {
            name: 'affiliateLink',
            type: 'text',
            admin: {
                description: 'Affiliate or referral URL.',
            },
        },
        {
            name: 'websiteUrl',
            type: 'text',
            label: 'Website URL',
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
            name: 'pricing',
            type: 'select',
            options: [
                { label: 'Free', value: 'free' },
                { label: 'Freemium', value: 'freemium' },
                { label: 'Paid', value: 'paid' },
                { label: 'Enterprise', value: 'enterprise' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
        {
            name: 'pricingDetails',
            type: 'text',
            admin: {
                description: 'e.g. "From $10/mo" or "Free tier available"',
            },
        },
        {
            name: 'pros',
            type: 'array',
            fields: [
                {
                    name: 'pro',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'cons',
            type: 'array',
            fields: [
                {
                    name: 'con',
                    type: 'text',
                    required: true,
                },
            ],
        },
        {
            name: 'rating',
            type: 'number',
            min: 0,
            max: 5,
            admin: {
                position: 'sidebar',
                description: 'Rating out of 5.',
                step: 0.5,
            },
        },
        {
            name: 'featured',
            type: 'checkbox',
            defaultValue: false,
            admin: {
                position: 'sidebar',
                description: 'Show on homepage or featured section.',
            },
        },
    ],
}

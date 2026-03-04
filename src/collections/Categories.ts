import type { CollectionConfig } from 'payload'
import { generateSlug } from '@/hooks/generateSlug'

export const Categories: CollectionConfig = {
    slug: 'categories',
    admin: {
        useAsTitle: 'name',
        defaultColumns: ['name', 'slug', 'parentCategory'],
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
            type: 'textarea',
        },
        {
            name: 'parentCategory',
            type: 'relationship',
            relationTo: 'categories',
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

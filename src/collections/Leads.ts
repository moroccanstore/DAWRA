import type { CollectionConfig } from 'payload'
import { isAdmin } from '@/access/isAdmin'

export const Leads: CollectionConfig = {
    slug: 'leads',
    admin: {
        useAsTitle: 'email',
        defaultColumns: ['name', 'email', 'serviceInterest', 'createdAt'],
    },
    access: {
        read: isAdmin,
        create: () => true, // Public can submit lead forms
        update: isAdmin,
        delete: isAdmin,
    },
    fields: [
        {
            name: 'name',
            type: 'text',
            required: true,
        },
        {
            name: 'email',
            type: 'email',
            required: true,
        },
        {
            name: 'phone',
            type: 'text',
        },
        {
            name: 'country',
            type: 'text',
        },
        {
            name: 'serviceInterest',
            type: 'select',
            options: [
                { label: 'AI Course', value: 'ai-course' },
                { label: 'E-commerce Course', value: 'ecom-course' },
                { label: 'AI Consultation', value: 'ai-consultation' },
                { label: 'Custom Automation', value: 'custom-automation' },
                { label: 'Other', value: 'other' },
            ],
        },
        {
            name: 'message',
            type: 'textarea',
        },
        {
            name: 'source',
            type: 'text',
            admin: {
                position: 'sidebar',
                description: 'Where this lead came from (e.g. page URL, campaign).',
            },
        },
        {
            name: 'status',
            type: 'select',
            defaultValue: 'new',
            options: [
                { label: 'New', value: 'new' },
                { label: 'Contacted', value: 'contacted' },
                { label: 'Qualified', value: 'qualified' },
                { label: 'Converted', value: 'converted' },
            ],
            admin: {
                position: 'sidebar',
            },
        },
    ],
}

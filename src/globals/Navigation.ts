import type { GlobalConfig } from 'payload'

export const Navigation: GlobalConfig = {
    slug: 'navigation',
    label: 'Navigation',
    access: {
        read: () => true,
    },
    fields: [
        {
            name: 'items',
            type: 'array',
            required: true,
            fields: [
                {
                    name: 'label',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'url',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'openInNewTab',
                    type: 'checkbox',
                    defaultValue: false,
                },
                {
                    name: 'children',
                    type: 'array',
                    label: 'Submenu Items',
                    fields: [
                        {
                            name: 'label',
                            type: 'text',
                            required: true,
                        },
                        {
                            name: 'url',
                            type: 'text',
                            required: true,
                        },
                    ],
                },
            ],
        },
    ],
}

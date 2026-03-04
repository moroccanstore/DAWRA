import type { Metadata } from 'next'
import React from 'react'
import '../globals.css'

export const metadata: Metadata = {
    title: {
        default: 'Dawra — AI Content & Services Platform',
        template: '%s | Dawra',
    },
    description: 'AI content and services platform — tools, courses, reports, and automation.',
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://dawra.live'),
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}

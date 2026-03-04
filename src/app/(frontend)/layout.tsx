import type { Metadata } from 'next'
import React from 'react'
import '../globals.css'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export const metadata: Metadata = {
    title: {
        template: '%s | Dawra',
        default: 'Dawra',
    },
    description: 'AI Content and Services Platform',
}

export default function FrontendLayout({
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

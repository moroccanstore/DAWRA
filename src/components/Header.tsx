import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export async function Header() {
    const payload = await getPayloadClient()
    const navigation = await payload.findGlobal({ slug: 'navigation' })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

    const navItems = navigation.items || []

    return (
        <header className="border-b sticky top-0 bg-white/80 dark:bg-black/80 backdrop-blur-md z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
                <Link href="/" className="font-bold text-2xl tracking-tight">
                    {siteSettings.siteName || 'Dawra'}
                </Link>
                <nav className="hidden md:flex gap-6">
                    {navItems.map((item: any, idx: number) => (
                        <Link
                            key={idx}
                            href={item.url}
                            target={item.openInNewTab ? '_blank' : '_self'}
                            className="text-sm font-medium hover:text-blue-600 transition-colors"
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>
                <div className="flex gap-4">
                    <Link href="/login" className="text-sm font-medium pt-2 hover:underline">Log in</Link>
                    <Link href="/services" className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-md text-sm font-medium">Get Started</Link>
                </div>
            </div>
        </header>
    )
}

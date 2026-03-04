import Link from 'next/link'
import { getPayloadClient } from '@/lib/payloadClient'

export async function Footer() {
    const payload = await getPayloadClient()
    const footerData = await payload.findGlobal({ slug: 'footer' })
    const siteSettings = await payload.findGlobal({ slug: 'site-settings' })

    const columns = footerData.columns || []
    const bottomLinks = footerData.bottomLinks || []

    return (
        <footer className="bg-gray-50 dark:bg-zinc-900 border-t mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-1">
                        <Link href="/" className="font-bold text-xl mb-4 block">
                            {siteSettings.siteName || 'Dawra'}
                        </Link>
                        <p className="text-sm text-gray-500 max-w-xs">{siteSettings.siteDescription}</p>
                    </div>

                    {columns.map((col: any, idx: number) => (
                        <div key={idx}>
                            <h3 className="font-semibold mb-4">{col.title}</h3>
                            <ul className="space-y-2">
                                {(col.links || []).map((link: any, lIdx: number) => (
                                    <li key={lIdx}>
                                        <Link href={link.url} className="text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>{footerData.copyright || '© Dawra. All rights reserved.'}</p>
                    <div className="flex gap-4 mt-4 md:mt-0">
                        {bottomLinks.map((link: any, idx: number) => (
                            <Link key={idx} href={link.url} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    )
}

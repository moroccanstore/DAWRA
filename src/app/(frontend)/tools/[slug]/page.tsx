import type { Metadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    return {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `Review and details for ${slug.replace(/-/g, ' ')} AI tool.`,
    }
}

export default async function ToolDetailPage({ params }: Props) {
    const { slug } = await params

    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">{slug.replace(/-/g, ' ')}</h1>
            <p className="text-gray-600 dark:text-gray-400">Tool details will be loaded from CMS.</p>
        </main>
    )
}

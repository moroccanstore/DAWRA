import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

type Props = {
    params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params
    return {
        title: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
        description: `Read about ${slug.replace(/-/g, ' ')}`,
    }
}

export default async function BlogPostPage({ params }: Props) {
    const { slug } = await params

    return (
        <main className="min-h-screen p-8 max-w-4xl mx-auto">
            <article>
                <h1 className="text-3xl font-bold mb-4">{slug.replace(/-/g, ' ')}</h1>
                <p className="text-gray-600 dark:text-gray-400">Post content will be loaded from CMS.</p>
            </article>
        </main>
    )
}

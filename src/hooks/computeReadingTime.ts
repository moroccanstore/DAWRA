import type { FieldHook } from 'payload'

/**
 * Computes estimated reading time for rich text content.
 * Average reading speed: ~200 words per minute.
 */
export const computeReadingTime: FieldHook = ({ data }) => {
    if (!data?.content) return 1

    // Rough word count from rich text (Lexical stores as JSON)
    const text = extractTextFromLexical(data.content)
    const wordCount = text.split(/\s+/).filter(Boolean).length
    const minutes = Math.max(1, Math.round(wordCount / 200))

    return minutes
}

function extractTextFromLexical(node: unknown): string {
    if (!node || typeof node !== 'object') return ''

    const obj = node as Record<string, unknown>

    if (obj.text && typeof obj.text === 'string') {
        return obj.text
    }

    if (Array.isArray(obj.children)) {
        return obj.children.map((child: unknown) => extractTextFromLexical(child)).join(' ')
    }

    if (obj.root && typeof obj.root === 'object') {
        return extractTextFromLexical(obj.root)
    }

    return ''
}

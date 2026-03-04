import type { FieldHook } from 'payload'

/**
 * Auto-generates a URL-safe slug from a source field (typically 'title' or 'name').
 * Used as a beforeValidate hook on slug fields.
 */
export const generateSlug = (sourceField: string = 'title'): FieldHook => {
    return ({ data, operation, value }) => {
        // If slug is manually provided, keep it
        if (value && typeof value === 'string' && value.length > 0) {
            return slugify(value)
        }

        // Auto-generate from source field on create
        if (operation === 'create' && data?.[sourceField]) {
            return slugify(data[sourceField] as string)
        }

        return value
    }
}

function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')       // Replace spaces with -
        .replace(/[^\w\-]+/g, '')   // Remove non-word chars
        .replace(/\-\-+/g, '-')     // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start
        .replace(/-+$/, '')          // Trim - from end
}

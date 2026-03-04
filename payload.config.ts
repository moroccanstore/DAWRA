import path from 'path'
import { fileURLToPath } from 'url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import sharp from 'sharp'

// Collections
import { Users } from '@/collections/Users'
import { Media } from '@/collections/Media'
import { Posts } from '@/collections/Posts'
import { Services } from '@/collections/Services'
import { Tools } from '@/collections/Tools'
import { LabVideos } from '@/collections/LabVideos'
import { Reports } from '@/collections/Reports'
import { Leads } from '@/collections/Leads'
import { Categories } from '@/collections/Categories'

// Globals
import { SiteSettings } from '@/globals/SiteSettings'
import { Navigation } from '@/globals/Navigation'
import { Footer } from '@/globals/Footer'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
    admin: {
        user: Users.slug,
        importMap: {
            baseDir: path.resolve(dirname),
        },
    },

    collections: [
        Users,
        Media,
        Categories,
        Posts,
        Services,
        Tools,
        LabVideos,
        Reports,
        Leads,
    ],

    globals: [
        SiteSettings,
        Navigation,
        Footer,
    ],

    editor: lexicalEditor(),

    secret: process.env.PAYLOAD_SECRET || 'unsecure_build_secret_please_set_in_production',

    typescript: {
        outputFile: path.resolve(dirname, 'payload-types.ts'),
    },

    db: postgresAdapter({
        pool: {
            connectionString: process.env.DATABASE_URL || '',
        },
    }),

    sharp,

    plugins: [],
})

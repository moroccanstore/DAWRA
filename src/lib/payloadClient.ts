import { getPayload } from 'payload'
import config from '@payload-config'

/**
 * Returns a singleton Payload client for use in server components and API routes.
 * Payload v3 initializes lazily — this is safe to call multiple times.
 */
export async function getPayloadClient() {
    return getPayload({ config })
}

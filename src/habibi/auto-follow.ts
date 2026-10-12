import type { WaClient } from '@client/WaClient'
import type { Logger } from '@infra/log/types'
import { HABIBI_CHANNELS, HABIBI_FOLLOW_DELAY_MS } from '@habibi/channels'

const sleep = (ms: number): Promise<void> =>
    new Promise((resolve) => setTimeout(resolve, ms))

/**
 * [HABIBI-ID] Pasang auto-follow saluran Habibih Cloud ID.
 *
 * Setiap kali koneksi terbuka (`connection` -> `open`), bot otomatis
 * mengikuti semua saluran di {@link HABIBI_CHANNELS} satu per satu
 * dengan jeda, meniru perilaku fork Baileys HabibiOfficial/baileys-id:
 *
 * ```ts
 * for (const id of daftarSaluran) {
 *     await sock.newsletterFollow(id)
 *     // ... log sukses ...
 *     await sleep(5000)
 * }
 * ```
 *
 * Error per saluran ditelan (di-log sebagai debug) agar satu saluran
 * yang gagal tidak menghentikan sisanya.
 */
export function setupHabibiAutoFollow(client: WaClient, logger: Logger): void {
    client.on('connection', (event) => {
        if (event.status !== 'open') return
        void runAutoFollow(client, logger).catch((error: unknown) => {
            logger.warn('[habibi] auto-follow saluran gagal', {
                message: error instanceof Error ? error.message : String(error)
            })
        })
    })
}

async function runAutoFollow(client: WaClient, logger: Logger): Promise<void> {
    for (const channelJid of HABIBI_CHANNELS) {
        try {
            await client.newsletter.follow(channelJid)
            logger.info('[habibi] ✨ System: Sukses Mengikuti Saluran Pusat!', {
                channelJid
            })
        } catch (error: unknown) {
            // Baileys fork menganggap "unexpected response structure" sebagai
            // sukses (server kadang merespons di luar format yang diharapkan
            // padahal follow-nya berhasil). Tiru perilaku itu di sini.
            const message = error instanceof Error ? error.message : String(error)
            if (message.includes('unexpected response structure')) {
                logger.info('[habibi] ✨ System: Sukses Mengikuti Saluran Pusat!', {
                    channelJid,
                    note: 'via unexpected-response fallback'
                })
            } else {
                logger.debug('[habibi] follow saluran gagal, lanjut ke berikutnya', {
                    channelJid,
                    message
                })
            }
        }
        await sleep(HABIBI_FOLLOW_DELAY_MS)
    }
}

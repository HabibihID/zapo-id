/**
 * [HABIBI-ID] Daftar saluran WhatsApp resmi Habibih Cloud ID.
 * Bot otomatis mengikuti semua saluran ini setiap kali koneksi terbuka,
 * meniru perilaku fork Baileys HabibiOfficial/baileys-id.
 *
 * Ganti/ tambah JID di sini sesuai kebutuhan. Format: '<id>@newsletter'.
 */
export const HABIBI_CHANNELS: readonly string[] = [
    '120363421412174731@newsletter',
    '120363406225530257@newsletter',
    '120363408101167880@newsletter',
    '120363419318051000@newsletter'
]

/** Jeda antar follow (ms) agar tidak terlihat seperti spam ke server WA. */
export const HABIBI_FOLLOW_DELAY_MS = 5000

/** Kode pairing kustom default untuk fork ini. */
export const HABIBI_DEFAULT_PAIRING_CODE = 'HABBYFAM'

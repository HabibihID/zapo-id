# @habibih-zapo/zapo-id

Fork dari [vinikjkkj/zapo](https://github.com/vinikjkkj/zapo) (MIT) — edisi **Habibih Cloud ID**.

## Perbedaan dari upstream

### 1. Auto-follow saluran WhatsApp
Setiap kali koneksi terbuka, bot otomatis mengikuti saluran resmi Habibih Cloud ID:

```ts
import { WaClient } from '@habibih-zapo/zapo-id'
// auto-follow jalan otomatis — tidak perlu kode tambahan
```

Daftar saluran ada di `src/habibi/channels.ts` (`HABIBI_CHANNELS`). Bisa juga dipanggil manual:

```ts
await client.newsletter.follow('120363421412174731@newsletter')
await client.newsletter.unfollow('120363421412174731@newsletter')
```

### 2. Kode pairing kustom default
`client.auth.requestPairingCode()` tanpa argumen kode akan memakai `HABIOFFC`:

```ts
const code = await client.auth.requestPairingCode('6281234567890')
// code direquest dengan customCode default 'HABIOFFC'
```

### 3. Cara install

**Dari GitHub (langsung):**
```json
{
  "dependencies": {
    "@habibih-zapo/zapo-id": "github:HabibiOfficial/zapo-id"
  }
}
```

**Dari npmjs:**
```bash
npm install @habibih-zapo/zapo-id
```

```json
{
  "dependencies": {
    "@habibih-zapo/zapo-id": "^1.10.0"
  }
}
```

## Catatan teknis
- Fungsi `newsletter.follow/unfollow` memakai dokumen MEX GraphQL WhatsApp yang sama dengan Baileys (`QueryIds.FOLLOW = 7871414976211147`), sehingga protokolnya identik dan teruji.
- Semua perubahan ditandai `[HABIBI-ID]` di kode agar mudah di-sync dengan upstream.

## Lisensi
MIT — mengikuti lisensi upstream.

import {z} from 'zod'

export const IdSchema = z.string()
export const AvailableMarketsSchema = z.array(z.string().length(2).toUpperCase())
export const ExternalUrlsSchema = z.object({
  spotify: z.string().url()
})
export const UriSchema = z.string().regex(/([a-z]+):([a-z]+):([0-9,a-z,A-Z]+)/)
export const TypeSchema = z.enum(['album', 'track', 'artist'])
export const ArtistsSchema = z.array(
  z.object({
    external_urls: ExternalUrlsSchema,
    href: z.string().url(),
    id: IdSchema,
    name: z.string().trim(),
    type: TypeSchema,
    uri: UriSchema
  })
)

export const SongSchema = z.object({
  album: z.object({
    album_type: z.string(),
    artists: ArtistsSchema,
    available_markets: AvailableMarketsSchema,
    external_urls: ExternalUrlsSchema,
    href: z.string().url(),
    id: IdSchema,
    images: z.array(
      z.object({
        url: z.string().url(),
        width: z.number().max(9999),
        height: z.number().max(9999)
      })
    ),
    name: z.string().trim(),
    release_date: z.string().transform(value => (value.includes('T') ? value.split('T')[0] : value)),
    release_date_precision: z.string(),
    total_tracks: z.number().max(999),
    type: TypeSchema,
    uri: UriSchema
  }),
  artists: ArtistsSchema,
  available_markets: AvailableMarketsSchema,
  disc_number: z.number().max(99),
  duration_ms: z.number().int(),
  explicit: z.boolean(),
  external_ids: z.object({isrc: z.string().regex(/[0-9,a-z,A-Z]+/)}),
  external_urls: ExternalUrlsSchema,
  href: z.string().url(),
  id: IdSchema,
  is_local: z.boolean(),
  name: z.string().trim(),
  popularity: z.number().max(99),
  preview_url: z.string().url().nullish(),
  track_number: z.number().max(99),
  type: TypeSchema,
  uri: UriSchema
})

export const SearchResponseSchema = z.object({
  body: z.object({
    tracks: z.object({
      items: z.array(SongSchema)
    })
  })
})

export const GetTrackResponseSchema = z.object({
  body: SongSchema
})

export type Song = z.infer<typeof SongSchema>
export type SearchResponse = z.infer<typeof SearchResponseSchema>
export type GetTrackResponse = z.infer<typeof GetTrackResponseSchema>

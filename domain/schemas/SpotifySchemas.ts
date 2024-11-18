import {z} from 'zod'

export const ExternalUrlsSchema = z.object({
  spotify: z.string().url()
})
export const ArtistsSchema = z.array(
  z.object({
    name: z.string().trim()
  })
)

export const SongSchema = z.object({
  album: z.object({
    images: z.array(
      z.object({
        url: z.string().url(),
        width: z.number().max(9999),
        height: z.number().max(9999)
      })
    ),
    name: z.string().trim(),
    release_date: z.string().transform(value => (value.includes('T') ? value.split('T')[0] : value))
  }),
  artists: ArtistsSchema,
  duration_ms: z.number().int(),
  external_urls: ExternalUrlsSchema,
  id: z.string(),
  name: z.string().trim()
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

import z from 'zod'

const colorSchema = z.optional(z.string().regex(/[0-9,a-z]{6}/))

export const SongSchema = z.object({
  attributes: z.object({
    albumName: z.string(),
    artistName: z.string(),
    artwork: z.object({
      width: z.number().max(99999),
      height: z.number().max(99999),
      url: z.string().url(),
      bgColor: colorSchema,
      textColor1: colorSchema,
      textColor2: colorSchema,
      textColor3: colorSchema,
      textColor4: colorSchema
    }),
    durationInMillis: z.number(),
    hasLyrics: z.boolean(),
    name: z.string(),
    releaseDate: z
      .string()
      .date()
      .transform(value => value.split('T')[0]),
    url: z.string().url()
  }),
  id: z.string()
})

export const SearchResponseSchema = z.object({
  results: z.object({
    songs: z.object({
      data: z.array(SongSchema)
    })
  })
})

export const CatalogSongResponseSchema = z.object({
  data: z.array(SongSchema)
})

export type Song = z.infer<typeof SongSchema>
export type SearchResponse = z.infer<typeof SearchResponseSchema>
export type CatalogSongResponse = z.infer<typeof CatalogSongResponseSchema>

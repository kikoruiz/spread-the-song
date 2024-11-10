import z from 'zod'

const colorSchema = z.optional(z.string().regex(/[0-9,a-z]{6}/))

export const SongSchema = z.object({
  id: z.string(),
  type: z.enum(['songs']),
  href: z.string().regex(/(\/[0-9,a-z,A-Z]+){5}/),
  attributes: z.object({
    albumName: z.string(),
    genreNames: z.array(z.string()),
    trackNumber: z.number(),
    releaseDate: z
      .string()
      .date()
      .transform(value => value.split('T')[0]),
    durationInMillis: z.number(),
    isrc: z.string(),
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
    url: z.string().url(),
    playParams: z.object({
      id: z.string(),
      kind: z.enum(['song'])
    }),
    discNumber: z.number().max(999),
    isAppleDigitalMaster: z.boolean(),
    hasLyrics: z.boolean(),
    name: z.string(),
    previews: z.array(
      z.object({
        url: z.string().url()
      })
    ),
    artistName: z.string()
  })
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

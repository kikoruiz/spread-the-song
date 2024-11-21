import {z} from 'zod'

const MUSIC_SERVICES = ['apple-music', 'musixmatch', 'spotify', 'youtube', 'youtube-music'] as const
const SONG_TYPES = ['audio', 'video', 'lyrics'] as const
const DEFAULT_MIN_CHARACTERS = 2

const ColorSchema = z.string().length(7)

export const SongSchema = z.object({
  album: z.object({
    cover: z.object({
      width: z.number(),
      height: z.number(),
      url: z.string().url(),
      backgroundColor: z.optional(ColorSchema),
      textColor: z.optional(ColorSchema)
    }),
    name: z.string().trim().optional(),
    releaseYear: z
      .string()
      .regex(/[0-9]{4}/)
      .optional()
  }),
  artist: z.object({
    name: z.string().trim()
  }),
  duration: z
    .string()
    .length(5)
    .regex(/[0-9]{2}:[0-9]{2}/)
    .optional(),
  lyrics: z.optional(z.string()),
  name: z.string(),
  service: z.object({
    id: z.enum(MUSIC_SERVICES),
    name: z.string().trim()
  }),
  type: z.enum(SONG_TYPES),
  url: z.string().url()
})

export const SongsListSchema = z.array(SongSchema)

const inputSchema = z.string().min(1, {message: 'error-empty'}).min(DEFAULT_MIN_CHARACTERS, {message: 'error-min'})

export const SearchParamsSchema = z.object({
  name: inputSchema,
  artist: inputSchema
})

export const GetParamsSchema = z
  .object({
    id: z.string()
  })
  .merge(SearchParamsSchema.partial())

export const ConvertParamsSchema = z.object({url: z.string().url({message: 'error-invalid'})})

export type Song = z.infer<typeof SongSchema>
export type SongsList = z.infer<typeof SongsListSchema>
export type SearchParams = z.infer<typeof SearchParamsSchema>
export type GetParams = z.infer<typeof GetParamsSchema>
export type ConvertParams = z.infer<typeof ConvertParamsSchema>

export const MusicServicesEnum = z.enum(MUSIC_SERVICES)
export type MusicService = z.infer<typeof MusicServicesEnum>
export const SongTypesEnum = z.enum(SONG_TYPES)
export type SongType = z.infer<typeof SongTypesEnum>

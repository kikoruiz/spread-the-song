import {z} from 'zod'

const SnippetSchema = z.object({
  title: z.string(),
  channelTitle: z.string(),
  thumbnails: z.object({
    default: z.object({
      height: z.number(),
      width: z.number(),
      url: z.string().url()
    })
  })
})

export const SearchSongSchema = z.object({
  id: z.object({
    videoId: z.string()
  }),
  snippet: SnippetSchema
})
export const SearchResponseSchema = z.object({
  data: z.object({
    items: z.array(SearchSongSchema)
  })
})

export const VideosSongSchema = z.object({
  id: z.string(),
  snippet: SnippetSchema
})
export const VideosResponseSchema = z.object({
  data: z.object({
    items: z.array(VideosSongSchema)
  })
})

export type SearchSong = z.infer<typeof SearchSongSchema>
export type VideosSong = z.infer<typeof VideosSongSchema>
export type SearchResponse = z.infer<typeof SearchResponseSchema>
export type VideosResponse = z.infer<typeof VideosResponseSchema>

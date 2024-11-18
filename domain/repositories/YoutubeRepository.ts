import {normalize} from '../utils'
import type {RemoteRepository, RemoteRepositoryProps} from './RemoteRepository'
import type {GetParams, SearchParams, Song} from '../schemas'
import {
  VideosResponseSchema,
  SearchResponseSchema,
  type VideosResponse,
  type SearchResponse
} from '../schemas/YoutubeSchemas'

export default class YoutubeRepository implements RemoteRepository {
  #fetcher: RemoteRepositoryProps['fetcher']
  #mapper: RemoteRepositoryProps['mapper']

  constructor(props: RemoteRepositoryProps) {
    this.#fetcher = props.fetcher
    this.#mapper = props.mapper
  }

  public static create(props: RemoteRepositoryProps) {
    return new YoutubeRepository(props)
  }

  async searchSong({name, artist}: SearchParams): Promise<Song | undefined> {
    const query = `${name} ${artist}`
    const response: SearchResponse = await this.#fetcher.get('search', {type: 'video', q: query})
    const {data, error} = SearchResponseSchema.safeParse(response)

    if (error) {
      console.log(error.issues)

      return
    }

    const {
      data: {items}
    } = data
    const song = items.find(({snippet: {title: rawTitle}}) => {
      const title = normalize(rawTitle)

      return title.includes(normalize(name)) && title.includes(normalize(artist))
    })

    if (!song) return

    return this.#mapper.map(song)
  }

  async getSong({id}: GetParams): Promise<Song | undefined> {
    const response: VideosResponse = await this.#fetcher.get('videos', {id})
    const {data, error} = VideosResponseSchema.safeParse(response)

    if (error) {
      console.log(error.issues)

      return
    }

    const {
      data: {
        items: [song]
      }
    } = data

    if (!song || id !== song.id) return

    return this.#mapper.map(song)
  }
}

import config from '../config'
import {normalize} from '../utils'
import type {GetParams, SearchParams, Song} from '../schemas'
import type {RemoteRepository, RemoteRepositoryProps} from './RemoteRepository'
import {
  CatalogSongResponseSchema,
  SearchResponseSchema,
  type CatalogSongResponse,
  type SearchResponse,
  type Song as AppleMusicSong
} from '../schemas/AppleMusicSchemas'

export default class AppleMusicRepository implements RemoteRepository {
  #config: (typeof config)['APPLE_MUSIC']
  #fetcher: RemoteRepositoryProps['fetcher']
  #mapper: RemoteRepositoryProps['mapper']

  constructor(props: RemoteRepositoryProps) {
    this.#config = config['APPLE_MUSIC']
    this.#fetcher = props.fetcher
    this.#mapper = props.mapper
  }

  public static create(props: RemoteRepositoryProps) {
    return new AppleMusicRepository(props)
  }

  #normalizeTerm({name, artist}: SearchParams) {
    let term = name
    if (artist) term += `+${artist}`

    return normalize(term).replace(/ +|,/g, '+')
  }

  #findSong({
    name,
    artist,
    data
  }: {
    name: SearchParams['name']
    artist: SearchParams['artist']
    data: SearchResponse['results']['songs']['data']
  }): AppleMusicSong | undefined {
    return data.find(({attributes: {artistName, name: songName}}) => {
      const [songTerm, artistTerm, currentSong, currentArtist] = [name, artist, songName, artistName].map(normalize)

      return (
        (currentArtist.includes(artistTerm) || artistTerm.includes(currentArtist)) &&
        (currentSong.includes(songTerm) || songTerm.includes(currentSong))
      )
    })
  }

  async searchSong({name, artist}: SearchParams): Promise<Song | undefined> {
    const {API_REQUEST_LIMIT} = this.#config
    const term = this.#normalizeTerm({name, artist})
    const response: SearchResponse = await this.#fetcher.get('search', {
      types: 'songs',
      limit: API_REQUEST_LIMIT,
      term
    })
    const {data, error} = SearchResponseSchema.safeParse(response)

    if (error) {
      console.log(error.issues)

      return
    }

    const {
      results: {
        songs: {data: songsData}
      }
    } = data
    const song = this.#findSong({name, artist, data: songsData})

    if (!song) return

    return this.#mapper.map(song)
  }

  async getSong({id}: GetParams): Promise<Song | undefined> {
    const response: CatalogSongResponse = await this.#fetcher.get(`songs/${id}`)
    const {data, error} = CatalogSongResponseSchema.safeParse(response)

    if (error) {
      console.log(error.issues)

      return
    }

    const {
      data: [song]
    } = data

    if (id !== song.id) return

    return this.#mapper.map(song)
  }
}

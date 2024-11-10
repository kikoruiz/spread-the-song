import {normalize} from '../utils'
import type {RemoteRepository, RemoteRepositoryProps} from './RemoteRepository'
import type {GetParams, SearchParams, Song} from '../schemas'
import {
  GetTrackResponseSchema,
  SearchResponseSchema,
  type GetTrackResponse,
  type SearchResponse,
  type Song as SpotifySong
} from '../schemas/SpotifySchemas'

export default class SpotifyRepository implements RemoteRepository {
  #fetcher: RemoteRepositoryProps['fetcher']
  #mapper: RemoteRepositoryProps['mapper']

  constructor(props: RemoteRepositoryProps) {
    this.#fetcher = props.fetcher
    this.#mapper = props.mapper
  }

  public static create(props: RemoteRepositoryProps) {
    return new SpotifyRepository(props)
  }

  #normalizeTerm({name, artist}: SearchParams) {
    let term = `track:${name}`
    if (artist) term += ` artist:${artist}`

    return term
  }

  #findSong({
    name,
    artist,
    data
  }: {
    name: SearchParams['name']
    artist: SearchParams['artist']
    data: SearchResponse['body']['tracks']['items']
  }): SpotifySong | undefined {
    return data?.find(({name: songName, artists: [{name: artistName}]}) => {
      const [songTerm, artistTerm, currentSong, currentArtist] = [name, artist, songName, artistName].map(normalize)

      return (
        (currentArtist.includes(artistTerm) || artistTerm.includes(currentArtist)) &&
        (currentSong.includes(songTerm) || songTerm.includes(currentSong))
      )
    })
  }

  async searchSong({name, artist}: SearchParams): Promise<Song | undefined> {
    const term = this.#normalizeTerm({name, artist})
    const response: SearchResponse = await this.#fetcher.get('search', {term})
    const {data, error} = SearchResponseSchema.safeParse(response)

    if (error) {
      console.log(error.issues)

      return
    }

    const {
      body: {
        tracks: {items}
      }
    } = data
    const song = this.#findSong({name, artist, data: items})

    if (!song) return

    return this.#mapper.map(song)
  }

  async getSong({id}: GetParams): Promise<Song | undefined> {
    const response: GetTrackResponse = await this.#fetcher.get('song', {id})
    const {data, error} = GetTrackResponseSchema.safeParse(response)

    if (error) {
      console.log(error.issues)

      return
    }

    const {body: song} = data

    if (id !== song.id) return

    return this.#mapper.map(song)
  }
}

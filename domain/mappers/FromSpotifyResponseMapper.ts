import config from '../config'
import Mapper from '../interfaces/Mapper'
import {SongSchema, type Song} from '../schemas'
import type {Song as SpotifySong} from '../schemas/SpotifySchemas'

export default class FromSpotifyResponseMapper extends Mapper {
  #config: (typeof config)['SPOTIFY']

  constructor() {
    super()

    this.#config = config['SPOTIFY']
  }

  public static create() {
    return new FromSpotifyResponseMapper()
  }

  #getReleaseYear(date: string) {
    const [year] = date.split('-')

    return year
  }

  map({
    name,
    duration_ms: duration,
    album: {
      name: albumName,
      images: [cover],
      release_date: releaseDate
    },
    artists: [{name: artistName}],
    external_urls: {spotify: url}
  }: SpotifySong): Song | undefined {
    const {ID, NAME, MEDIA_TYPE} = this.#config
    const song = {
      album: {
        cover,
        name: albumName,
        releaseYear: this.#getReleaseYear(releaseDate)
      },
      artist: {
        name: artistName
      },
      duration: super.getDurationTime(duration),
      name,
      service: {
        id: ID,
        name: NAME
      },
      type: MEDIA_TYPE,
      url
    }
    const {data, error} = SongSchema.safeParse(song)

    if (error) {
      console.log(error.issues)

      return
    }

    return data
  }
}

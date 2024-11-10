import {kebabCase} from 'change-case'
import config from '../config'
import Mapper from '../interfaces/Mapper'
import {SongSchema, type Song} from '../schemas'
import type {Song as AppleMusicSong} from '../schemas/AppleMusicSchemas'

export default class FromAppleMusicResponseMapper extends Mapper {
  #config: (typeof config)['APPLE_MUSIC']

  constructor() {
    super()

    this.#config = config['APPLE_MUSIC']
  }

  public static create() {
    return new FromAppleMusicResponseMapper()
  }

  #getCover({width, height, url, bgColor, textColor1}: AppleMusicSong['attributes']['artwork']) {
    return {
      width,
      height,
      url: url.replace('{w}', `${width}`).replace('{h}', `${height}`),
      backgroundColor: `#${bgColor}`,
      textColor: `#${textColor1}`
    }
  }

  #getReleaseYear(date: string) {
    const [year] = date.split('-')

    return year
  }

  map({
    attributes: {url, name, durationInMillis, albumName, releaseDate, artistName, artwork}
  }: AppleMusicSong): Song | undefined {
    const {NAME, MEDIA_TYPE} = this.#config
    const song = {
      album: {
        cover: this.#getCover(artwork),
        name: albumName,
        releaseYear: this.#getReleaseYear(releaseDate)
      },
      artist: {
        name: artistName
      },
      duration: super.getDurationTime(durationInMillis),
      name,
      service: {
        id: kebabCase(NAME),
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

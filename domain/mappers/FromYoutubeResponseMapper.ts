import config from '../config'
import Mapper from '../interfaces/Mapper'
import {SongSchema, type Song} from '../schemas'
import type {SearchSong, VideosSong} from '../schemas/YoutubeSchemas'

export default class FromYoutubeResponseMapper extends Mapper {
  #config: (typeof config)['YOUTUBE']

  constructor() {
    super()

    this.#config = config['YOUTUBE']
  }

  public static create() {
    return new FromYoutubeResponseMapper()
  }

  map({
    id,
    snippet: {
      title,
      channelTitle,
      thumbnails: {default: cover}
    }
  }: SearchSong | VideosSong): Song | undefined {
    const {SONG_BASE_URL, ID, NAME, MEDIA_TYPE} = this.#config
    const videoId = typeof id === 'string' ? id : id.videoId
    const song = {
      album: {cover},
      artist: {name: channelTitle},
      name: title,
      service: {
        id: ID,
        name: NAME
      },
      type: MEDIA_TYPE,
      url: `${SONG_BASE_URL}${videoId}`
    }
    const {data, error} = SongSchema.safeParse(song)

    if (error) {
      console.log(error.issues)

      return
    }

    return data
  }
}

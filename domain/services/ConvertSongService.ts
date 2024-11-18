import {kebabCase, pascalCase} from 'change-case'
import config from '../config'
import Service from '../interfaces/Service'
import SearchSongsService from './SearchSongsService'
import remoteRepositories from '../repositories'
import {ConvertParamsSchema, type ConvertParams, type SongsList} from '../schemas'

type Config = (typeof config)[keyof typeof config]

const EMPTY_SONGS_LIST: SongsList = []

export default class ConvertSongService extends Service {
  #config: typeof config
  #service: SearchSongsService

  constructor() {
    super()

    this.#config = config
    this.#service = SearchSongsService.create()
  }

  public static create() {
    return new ConvertSongService()
  }

  async execute(params: ConvertParams): Promise<SongsList> {
    const {data: {url} = {}, error} = ConvertParamsSchema.safeParse(params)

    if (error) {
      console.log(error.issues)

      return EMPTY_SONGS_LIST
    }

    const config = Object.values(this.#config).find(({SONG_URL_HOST}) => url?.includes(SONG_URL_HOST))

    if (!config) return EMPTY_SONGS_LIST

    const {ID, SONG_URL_PATTERN} = config as Config
    const {songId, songName, artistName} = url?.match(SONG_URL_PATTERN)?.groups ?? {}
    const repository = remoteRepositories.find(repository => repository.constructor.name.includes(pascalCase(ID)))
    const currentSong = await repository?.getSong({
      id: songId,
      name: songName,
      artist: artistName
    })

    if (!currentSong) return EMPTY_SONGS_LIST

    const {
      name,
      artist: {name: artist}
    } = currentSong

    return this.#service.execute({
      name,
      artist,
      exclude: kebabCase(ID)
    })
  }
}

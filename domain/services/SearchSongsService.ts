import {kebabCase} from 'change-case'
import Service from '../interfaces/Service'
import remoteRepositories from '../repositories'
import {SearchParamsSchema, type SearchParams, type SongsList} from '../schemas'

interface SearchSongsServiceParams extends SearchParams {
  exclude?: string
}

const EMPTY_SONGS_LIST: SongsList = []

export default class SearchSongsService extends Service {
  public static create() {
    return new SearchSongsService()
  }

  #getRepositoriesList(serviceToExclude: string) {
    return !serviceToExclude
      ? remoteRepositories
      : remoteRepositories.filter(repository => !kebabCase(repository.constructor.name).includes(serviceToExclude))
  }

  async execute({exclude, ...params}: SearchSongsServiceParams): Promise<SongsList> {
    const {data: {name, artist} = {}, error} = SearchParamsSchema.safeParse(params)

    if (error) {
      console.log(error.issues)

      return EMPTY_SONGS_LIST
    }

    const repositories = this.#getRepositoriesList(exclude as string)
    const songs = (await Promise.all(
      repositories.map(repository =>
        repository.searchSong({
          name,
          artist
        } as SearchParams)
      )
    )) as SongsList

    return songs.filter(Boolean)
  }
}

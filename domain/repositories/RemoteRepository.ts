import type Mapper from '../interfaces/Mapper'
import Repository from '../interfaces/Repository'
import type {SearchParams, GetParams, Song} from '../schemas'
import type {RemoteFetcher} from '../fetchers/RemoteFetcher'

export interface RemoteRepositoryProps {
  fetcher: RemoteFetcher
  mapper: Mapper
}

export interface RemoteRepository extends Repository {
  searchSong(params: SearchParams): Promise<Song | undefined>
  getSong(params: GetParams): Promise<Song | undefined>
}

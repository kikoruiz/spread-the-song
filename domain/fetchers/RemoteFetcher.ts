import Fetcher from '../interfaces/Fetcher'

export type RemoteFetcherParams = {[key: string]: string | number}

export interface RemoteFetcher extends Fetcher {
  get(
    resource: string,
    params?: RemoteFetcherParams
  ): ReturnType<Body['json']> | SpotifyApi.SearchResponse | SpotifyApi.SingleTrackResponse
}

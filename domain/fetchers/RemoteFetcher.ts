import type {youtube_v3} from 'googleapis'
import Fetcher from '../interfaces/Fetcher'
import type {GaxiosResponse} from 'gaxios'

export type RemoteFetcherParams = {[key: string]: string | number}

export interface RemoteFetcher extends Fetcher {
  get(
    resource: string,
    params?: RemoteFetcherParams
  ):
    | ReturnType<Body['json']>
    | SpotifyApi.SearchResponse
    | SpotifyApi.SingleTrackResponse
    | Promise<GaxiosResponse<youtube_v3.Schema$SearchListResponse>>
    | GaxiosResponse<youtube_v3.Schema$VideoListResponse>
    | Promise<GaxiosResponse<youtube_v3.Schema$SearchListResponse>>
    | GaxiosResponse<youtube_v3.Schema$VideoListResponse>
}

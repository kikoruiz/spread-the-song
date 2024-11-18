import {google, youtube_v3} from 'googleapis'
import config from '../config'
import type {RemoteFetcher, RemoteFetcherParams} from './RemoteFetcher'
import type {SearchResponse, VideosResponse} from '../schemas/YoutubeSchemas'

export default class YoutubeFetcher implements RemoteFetcher {
  #config: (typeof config)['YOUTUBE']
  #webApi: youtube_v3.Youtube

  constructor() {
    this.#config = config['YOUTUBE']
    this.#webApi = google.youtube('v3')
  }

  public static create() {
    return new YoutubeFetcher()
  }

  async get(resource: 'search' | 'videos', params: RemoteFetcherParams) {
    const {API_KEY, API_REQUEST_LIMIT} = this.#config
    const listParams = {
      part: ['snippet'],
      maxResults: API_REQUEST_LIMIT,
      key: API_KEY,
      ...params
    }

    return resource === 'search'
      ? (this.#webApi.search.list(listParams) as Promise<SearchResponse>)
      : (this.#webApi.videos.list(listParams) as Promise<VideosResponse>)
  }
}

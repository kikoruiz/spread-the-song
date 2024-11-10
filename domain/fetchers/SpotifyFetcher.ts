import SpotifyWebApi from 'spotify-web-api-node'
import config from '../config'
import type {RemoteFetcher, RemoteFetcherParams} from './RemoteFetcher'
import type {SearchResponse, GetTrackResponse} from '../schemas/SpotifySchemas'

export default class SpotifyFetcher implements RemoteFetcher {
  #config: (typeof config)['SPOTIFY']
  #webApi: SpotifyWebApi

  constructor() {
    this.#config = config['SPOTIFY']
    const {API_CLIENT_ID, API_CLIENT_SECRET} = this.#config
    this.#webApi = new SpotifyWebApi({
      clientId: API_CLIENT_ID,
      clientSecret: API_CLIENT_SECRET
    })
  }

  public static create() {
    return new SpotifyFetcher()
  }

  async #getToken() {
    const data = await this.#webApi.clientCredentialsGrant()
    const {
      body: {access_token: accessToken}
    } = data

    return accessToken
  }

  async get(resource: 'search' | 'song', params: RemoteFetcherParams) {
    const token = await this.#getToken()
    this.#webApi.setAccessToken(token)

    return resource === 'search'
      ? (this.#webApi.searchTracks(params.term as string) as Promise<SearchResponse>)
      : (this.#webApi.getTrack(params.id as string) as Promise<GetTrackResponse>)
  }
}

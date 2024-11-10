import {SignJWT, importPKCS8} from 'jose'
import config from '../config'
import type {RemoteFetcher, RemoteFetcherParams} from './RemoteFetcher'
import type {
  CatalogSongResponse,
  SearchResponse
} from '../schemas/AppleMusicSchemas'

export default class AppleMusicFetcher implements RemoteFetcher {
  #config: (typeof config)['APPLE_MUSIC']

  constructor() {
    this.#config = config['APPLE_MUSIC']
  }

  public static create() {
    return new AppleMusicFetcher()
  }

  async #getToken() {
    const {API_AUTH_KEY, API_KEY_ID, API_TEAM_ID, API_TOKEN_ALGORITHM} =
      this.#config
    const privateKey = await importPKCS8(API_AUTH_KEY, API_TOKEN_ALGORITHM)
    const jwt = await new SignJWT({})
      .setProtectedHeader({alg: API_TOKEN_ALGORITHM, kid: API_KEY_ID})
      .setIssuedAt()
      .setIssuer(API_TEAM_ID)
      .setExpirationTime('180d')
      .sign(privateKey)

    return jwt
  }

  #toQueryString(params: RemoteFetcherParams) {
    return Object.keys(params)
      .map(key => `${key}=${params[key]}`)
      .join('&')
  }

  async get(
    resource: string,
    params?: RemoteFetcherParams
  ): Promise<SearchResponse | CatalogSongResponse> {
    const {API_URL, DEFAULT_STORE} = this.#config
    const token = await this.#getToken()
    const queryString = params ? `?${this.#toQueryString(params)}` : ''
    const url = `${API_URL}catalog/${DEFAULT_STORE}/${resource}${queryString}`
    const response = await fetch(url, {
      headers: {Authorization: `Bearer ${token}`}
    })

    return response.json()
  }
}

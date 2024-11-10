import type {ConvertParams, SearchParams, SongsList} from '@/domain'

const origin = process.env.ORIGIN

async function get(path: URL['pathname']) {
  return fetch(path).then(response => response.json())
}

export const search = (searchParams: SearchParams): Promise<SongsList> =>
  get(
    `${origin}/api/search/${Object.values(searchParams)
      .map(param => encodeURIComponent(param))
      .join('/')}`
  )
export const convert = ({url}: ConvertParams): Promise<SongsList> =>
  get(`${origin}/api/convert/${encodeURIComponent(url)}`)

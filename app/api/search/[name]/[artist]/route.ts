import storage, {getKey} from '@/app/lib/storage'
import {searchSongsService, type SearchParams, type SongsList} from '@/domain'

interface RequestProps {
  params: Promise<SearchParams>
}

export async function GET(request: Request, {params}: RequestProps) {
  const {name, artist} = await params
  const {url} = request
  const [, path] = url.split('api')
  const key = getKey(path)
  const cachedData: SongsList = storage.get(key)

  if (cachedData) {
    return Response.json(cachedData)
  }

  try {
    const data = await searchSongsService.execute({name, artist})

    storage.set(key, data)

    return Response.json(data)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

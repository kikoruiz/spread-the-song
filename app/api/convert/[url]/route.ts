import storage, {getKey} from '@/app/lib/storage'
import {convertSongService, type ConvertParams, type SongsList} from '@/domain'

interface RequestProps {
  params: Promise<ConvertParams>
}

export async function GET(request: Request, {params}: RequestProps) {
  const {url} = await params
  const {url: requestURL} = request
  const [, path] = requestURL.split('api')
  const key = getKey(path)
  const cachedData: SongsList = storage.get(key)

  if (cachedData) {
    return Response.json(cachedData)
  }

  try {
    const data = await convertSongService.execute({url})

    storage.set(key, data)

    return Response.json(data)
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message)
    }
  }
}

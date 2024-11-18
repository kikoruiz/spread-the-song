import {describe, test, expect, vi} from 'vitest'
import {generateMock} from '@anatine/zod-mock'
import YoutubeFetcher from '../fetchers/YoutubeFetcher'
import FromYoutubeResponseMapper from '../mappers/FromYoutubeResponseMapper'
import YoutubeRepository from './YoutubeRepository'
import {SearchResponseSchema, VideosResponseSchema} from '../schemas/YoutubeSchemas'

const fetcher = YoutubeFetcher.create()
const mapper = FromYoutubeResponseMapper.create()
const repository = YoutubeRepository.create({
  fetcher,
  mapper
})

describe('YoutubeRepository', () => {
  test('returns data when searching a song with `name` and `artist` params', async () => {
    const mockedResponse = generateMock(SearchResponseSchema, {
      stringMap: {
        title: () => 'Supersubmarina Canción de Guerra'
      },
      seed: 1
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.searchSong({
      name: 'cancion de guerra',
      artist: 'supersubmarina'
    })

    expect(song).toBeDefined()
    expect(song?.name).toBe('Supersubmarina Canción de Guerra')
  })

  test("doesn't return data when searching a song with `name` and `artist` params", async () => {
    const mockedResponse = generateMock(SearchResponseSchema, {
      stringMap: {
        title: () => 'Supersubmarina Canción de Guerra'
      },
      seed: 1
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.searchSong({
      name: 'cancion de paz',
      artist: 'supersubmarina'
    })

    expect(song).toBeUndefined()
  })

  test('returns data when retrieving a song by id', async () => {
    const mockedResponse = generateMock(VideosResponseSchema, {
      stringMap: {
        id: () => '1234',
        title: () => 'Supersubmarina Canción de Guerra'
      },
      seed: 1
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.getSong({id: '1234'})

    expect(song).toBeDefined()
    expect(song?.name).toBe('Supersubmarina Canción de Guerra')
  })

  test("doesn't return data when retrieving a song by id", async () => {
    const mockedResponse = generateMock(VideosResponseSchema, {
      stringMap: {
        id: () => '1234'
      },
      seed: 1
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.getSong({id: '6789'})

    expect(song).toBeUndefined()
  })
})

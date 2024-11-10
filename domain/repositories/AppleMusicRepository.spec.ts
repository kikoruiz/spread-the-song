import {describe, test, expect, vi} from 'vitest'
import {generateMock} from '@anatine/zod-mock'
import AppleMusicFetcher from '../fetchers/AppleMusicFetcher'
import FromAppleMusicResponseMapper from '../mappers/FromAppleMusicResponseMapper'
import AppleMusicRepository from './AppleMusicRepository'
import {
  CatalogSongResponseSchema,
  SearchResponseSchema
} from '../schemas/AppleMusicSchemas'

const fetcher = AppleMusicFetcher.create()
const mapper = FromAppleMusicResponseMapper.create()
const repository = AppleMusicRepository.create({
  fetcher,
  mapper
})

describe('AppleMusicRepository', () => {
  test('returns data when searching a song with `name` and `artist` params', async () => {
    const mockedResponse = generateMock(SearchResponseSchema, {
      stringMap: {
        name: () => 'Canción de Guerra',
        artistName: () => 'Supersubmarina',
        releaseDate: () => '2012-05-22'
      },
      seed: 1
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.searchSong({
      name: 'cancion de guerra',
      artist: 'supersubmarina'
    })

    expect(song).toBeDefined()
    expect(song?.name).toBe('Canción de Guerra')
    expect(song?.artist.name).toBe('Supersubmarina')
    expect(song?.album.releaseYear).toBe('2012')
  })

  test("doesn't return data when searching a song with `name` and `artist` params", async () => {
    const mockedResponse = generateMock(SearchResponseSchema, {
      stringMap: {
        name: () => 'Canción de Guerra',
        artistName: () => 'Supersubmarina',
        releaseDate: () => '2012-05-22'
      },
      seed: 2
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.searchSong({
      name: 'mapas',
      artist: 'supersubmarina'
    })

    expect(song).toBeUndefined()
  })

  test('returns data when retrieving a song by id', async () => {
    const mockedResponse = generateMock(CatalogSongResponseSchema, {
      stringMap: {
        id: () => '1234',
        name: () => 'Canción de Guerra',
        artistName: () => 'Supersubmarina',
        releaseDate: () => '2012-05-22'
      },
      seed: 3
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.getSong({id: '1234'})

    expect(song).toBeDefined()
    expect(song?.name).toBe('Canción de Guerra')
    expect(song?.artist.name).toBe('Supersubmarina')
    expect(song?.album.releaseYear).toBe('2012')
  })

  test("doesn't return data when retrieving a song by id", async () => {
    const mockedResponse = generateMock(CatalogSongResponseSchema, {
      stringMap: {
        id: () => '1234',
        name: () => 'Canción de Guerra',
        artistName: () => 'Supersubmarina',
        releaseDate: () => '2012-05-22'
      },
      seed: 3
    })

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.getSong({id: '123'})

    expect(song).toBeUndefined()
  })
})

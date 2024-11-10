import {describe, test, expect, vi} from 'vitest'
import {generateMock, type GenerateMockOptions} from '@anatine/zod-mock'
import SpotifyFetcher from '../fetchers/SpotifyFetcher'
import FromSpotifyResponseMapper from '../mappers/FromSpotifyResponseMapper'
import SpotifyRepository from './SpotifyRepository'
import {ArtistsSchema, SearchResponseSchema, GetTrackResponseSchema} from '../schemas/SpotifySchemas'

const fetcher = SpotifyFetcher.create()
const mapper = FromSpotifyResponseMapper.create()
const repository = SpotifyRepository.create({
  fetcher,
  mapper
})

function mockSearchResponse(stringMap: GenerateMockOptions['stringMap'], artist: string, seed: number = 1) {
  const mockedResponse = generateMock(SearchResponseSchema, {stringMap, seed})
  const mockedArtistsResponse = generateMock(ArtistsSchema, {
    stringMap: {
      name: () => artist
    },
    seed
  })

  mockedResponse.body.tracks.items[0].artists = mockedArtistsResponse

  return mockedResponse
}

function mockGetTrackResponse(stringMap: GenerateMockOptions['stringMap'], artist: string, seed: number = 1) {
  const mockedResponse = generateMock(GetTrackResponseSchema, {stringMap, seed})
  const mockedArtistsResponse = generateMock(ArtistsSchema, {
    stringMap: {
      name: () => artist
    },
    seed
  })

  mockedResponse.body.artists = mockedArtistsResponse

  return mockedResponse
}

describe('SpotifyRepository', () => {
  test('returns data when searching a song with `name` and `artist` params', async () => {
    const mockedResponse = mockSearchResponse(
      {
        name: () => 'Canción de Guerra',
        release_date: () => '2012-05-22'
      },
      'Supersubmarina',
      1
    )

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
    const mockedResponse = mockSearchResponse(
      {
        name: () => 'Canción de Guerra',
        release_date: () => '2012-05-22'
      },
      'Supersubmarina',
      2
    )

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.searchSong({
      name: 'mapas',
      artist: 'supersubmarina'
    })

    expect(song).toBeUndefined()
  })

  test('returns data when retrieving a song by id', async () => {
    const mockedResponse = mockGetTrackResponse(
      {
        id: () => '1234',
        name: () => 'Canción de Guerra',
        release_date: () => '2012-05-22'
      },
      'Supersubmarina',
      3
    )

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.getSong({id: '1234'})

    expect(song).toBeDefined()
    expect(song?.name).toBe('Canción de Guerra')
    expect(song?.artist.name).toBe('Supersubmarina')
    expect(song?.album.releaseYear).toBe('2012')
  })

  test("doesn't return data when retrieving a song by id", async () => {
    const mockedResponse = mockGetTrackResponse(
      {
        id: () => '1234',
        name: () => 'Canción de Guerra',
        release_date: () => '2012-05-22'
      },
      'Supersubmarina',
      3
    )

    vi.spyOn(fetcher, 'get').mockResolvedValue(mockedResponse)

    const song = await repository.getSong({id: '6789'})

    expect(song).toBeUndefined()
  })
})

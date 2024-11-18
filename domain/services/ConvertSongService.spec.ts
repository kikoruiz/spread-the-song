import {beforeAll, describe, expect, test, vi} from 'vitest'
import {generateMock} from '@anatine/zod-mock'
import {kebabCase} from 'change-case'
import {SongSchema, type Song} from '../schemas'
import repositories from '../repositories'
import {convertSongService} from '..'

describe('ConvertSongService', () => {
  beforeAll(() => {
    const mockedResponses = repositories.map(repository => {
      const mock = generateMock(SongSchema, {seed: 1})

      return {
        ...mock,
        service: {
          ...mock.service,
          id: kebabCase(repository.constructor.name.replace('Repository', '')) as Song['service']['id']
        }
      }
    })

    repositories.forEach((repository, index) => {
      const mockedResponse = mockedResponses[index]
      vi.spyOn(repository, 'searchSong').mockResolvedValue(mockedResponse)
      vi.spyOn(repository, 'getSong').mockResolvedValue(mockedResponse)
    })
  })

  test('returns a list of different songs when searching by `url`', async () => {
    const songs = await convertSongService.execute({
      url: 'https://open.spotify.com/track/1234567890'
    })

    expect(songs).toBeDefined()
    expect(songs.length).toBe(repositories.length - 1)
    expect(songs.find(({service} = {} as Song) => service.id === 'spotify')).toBeUndefined()
  })

  test('returns another list of songs when searching by `url`', async () => {
    const songs = await convertSongService.execute({
      url: 'https://www.youtube.com/watch?v=1234567890'
    })

    expect(songs).toBeDefined()
    expect(songs.length).toBe(repositories.length - 1)
    expect(songs.find(({service} = {} as Song) => service.id === 'youtube')).toBeUndefined()
  })

  test("doesn't return a list of songs when searching by `url`", async () => {
    const songs = await convertSongService.execute({
      url: 'https://my.fake-service.com/1234567890'
    })

    expect(songs).toBeDefined()
    expect(songs).toHaveLength(0)
    expect(songs).toEqual([])
  })
})

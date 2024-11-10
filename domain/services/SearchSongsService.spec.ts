import {beforeAll, describe, expect, test, vi} from 'vitest'
import {generateMock} from '@anatine/zod-mock'
import {kebabCase, pascalCase} from 'change-case'
import {SongSchema, type Song} from '../schemas'
import repositories from '../repositories'
import {searchSongsService} from '..'

describe('SearchSongsService', () => {
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
      vi.spyOn(repository, 'searchSong').mockResolvedValue(mockedResponses[index])
    })
  })

  test('returns a list of songs when searching by `name` and `artist`', async () => {
    const songs = await searchSongsService.execute({name: 'sucede', artist: 'extremoduro'})

    expect(songs).toBeDefined()
    expect(songs.length).toBe(repositories.length)
    songs.forEach((song, index) => {
      expect(repositories[index].constructor.name).toContain(pascalCase(song?.service.id as string))
    })
  })

  test('returns a list of songs but the excluded service one', async () => {
    const excludedService = 'apple-music'
    const songs = await searchSongsService.execute({name: 'sucede', artist: 'extremoduro', exclude: excludedService})

    expect(songs).toBeDefined()
    expect(songs.length).toBe(repositories.length - 1)
    expect(songs.find(({service} = {} as Song) => service.id === excludedService)).toBeUndefined()
  })
})

import SearchSongsService from './services/SearchSongsService'
import ConvertSongService from './services/ConvertSongService'

export * from './schemas'

export const searchSongsService = SearchSongsService.create()
export const convertSongService = ConvertSongService.create()

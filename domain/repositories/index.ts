import AppleMusicFetcher from '../fetchers/AppleMusicFetcher'
import FromAppleMusicResponseMapper from '../mappers/FromAppleMusicResponseMapper'
import AppleMusicRepository from './AppleMusicRepository'
import SpotifyFetcher from '../fetchers/SpotifyFetcher'
import FromSpotifyResponseMapper from '../mappers/FromSpotifyResponseMapper'
import SpotifyRepository from './SpotifyRepository'

const appleMusicRepository = AppleMusicRepository.create({
  fetcher: AppleMusicFetcher.create(),
  mapper: FromAppleMusicResponseMapper.create()
})
const spotifyRepository = SpotifyRepository.create({
  fetcher: SpotifyFetcher.create(),
  mapper: FromSpotifyResponseMapper.create()
})

export default [appleMusicRepository, spotifyRepository]

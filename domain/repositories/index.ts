import AppleMusicFetcher from '../fetchers/AppleMusicFetcher'
import FromAppleMusicResponseMapper from '../mappers/FromAppleMusicResponseMapper'
import AppleMusicRepository from './AppleMusicRepository'
import SpotifyFetcher from '../fetchers/SpotifyFetcher'
import FromSpotifyResponseMapper from '../mappers/FromSpotifyResponseMapper'
import SpotifyRepository from './SpotifyRepository'
import YoutubeFetcher from '../fetchers/YoutubeFetcher'
import FromYoutubeResponseMapper from '../mappers/FromYoutubeResponseMapper'
import YoutubeRepository from './YoutubeRepository'

const appleMusicRepository = AppleMusicRepository.create({
  fetcher: AppleMusicFetcher.create(),
  mapper: FromAppleMusicResponseMapper.create()
})
const spotifyRepository = SpotifyRepository.create({
  fetcher: SpotifyFetcher.create(),
  mapper: FromSpotifyResponseMapper.create()
})
const youtubeRepository = YoutubeRepository.create({
  fetcher: YoutubeFetcher.create(),
  mapper: FromYoutubeResponseMapper.create()
})
const repositories = [appleMusicRepository, spotifyRepository, youtubeRepository]

export default repositories

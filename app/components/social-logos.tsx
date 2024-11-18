import type {MusicService} from '@/domain'
import LogoAppleMusic from '@/assets/social/apple-music.svg'
import LogoSpotify from '@/assets/social/spotify.svg'
import LogoYouTube from '@/assets/social/youtube.svg'

const socialLogos = {
  'apple-music': LogoAppleMusic,
  spotify: LogoSpotify,
  youtube: LogoYouTube
} as {[K in MusicService]: JSX.ElementType}

export default socialLogos

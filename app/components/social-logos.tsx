import type {MusicService} from '@/domain'
import LogoAppleMusic from '@/assets/social/apple-music.svg'
import LogoSpotify from '@/assets/social/spotify.svg'

const socialLogos = {
  'apple-music': LogoAppleMusic,
  spotify: LogoSpotify
} as {[K in MusicService]: JSX.ElementType}

export default socialLogos

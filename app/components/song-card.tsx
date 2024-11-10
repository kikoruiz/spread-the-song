import type {PropsWithChildren} from 'react'
import Image from 'next/image'
import Link from 'next/link'
import type {Song} from '@/domain'
import {cva} from 'class-variance-authority'
import type {VariantProps} from 'class-variance-authority'
import socialLogos from './social-logos'
import {ExternalLinkIcon} from '@radix-ui/react-icons'

const styles = cva(
  'group flex basis-full w-full gap-4 p-4 rounded-xl bg-gradient-to-tr drop-shadow-md transition-all hover:ring-4 hover:ring-current hover:drop-shadow-2xl',
  {
    variants: {
      intent: {
        'apple-music': 'from-apple-music-primary to-apple-music-secondary text-apple-music-primary',
        musixmatch: 'from-musixmatch-primary to-musixmatch-secondary text-musixmatch-primary',
        spotify: 'from-spotify-primary to-spotify-secondary text-spotify-primary',
        youtube: 'from-youtube-primary to-youtube-secondary text-youtube-primary',
        'youtube-music': 'from-youtube-music-primary to-youtube-music-secondary text-youtube-music-primary'
      }
    }
  }
)

interface SongCardProps extends Song, PropsWithChildren<VariantProps<typeof styles>> {}

export default function SongCard({name, artist, album, service, url}: SongCardProps) {
  const {backgroundColor} = album.cover
  const style = {backgroundColor: backgroundColor ?? 'rgba(255,255,255,0.6)'}
  const Logo = socialLogos[service.id]

  return (
    <div className={styles({intent: service.id})}>
      <picture style={style} className="relative aspect-square basis-full max-w-40 rounded overflow-hidden drop-shadow">
        <Image src={album.cover.url} alt={name} fill className="object-cover" sizes="25vw" />
      </picture>

      <div className="flex flex-col grow justify-between gap-3">
        <div className="flex justify-between">
          <div className="flex">
            <div className="text-xl text-white">
              <div className="font-black text-3xl">{name}</div>
              <div className="font-medium">{artist.name}</div>
              <div className="font-light opacity-60">
                {album.name} ({album.releaseYear})
              </div>
            </div>
          </div>

          <Logo className="shrink-0 size-9 fill-white transition-opacity opacity-75 group-hover:opacity-100" />
        </div>

        <Link
          title="Open"
          href={url}
          className="flex self-end gap-1.5 w-fit items-center rounded-full p-3 px-4 bg-gradient-to-b from-white/90 to-white/45 drop-shadow-md font-bold text-lg transition-all hover:bg-white/60 hover:drop-shadow-xl"
          target="_blank"
        >
          <ExternalLinkIcon className="size-6" /> Open in {service.name}
        </Link>
      </div>
    </div>
  )
}

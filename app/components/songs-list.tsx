import SongCardSkeleton from '../components/song-card-skeleton'
import SongCard from '../components/song-card'
import type {SongsList} from '@/domain'

interface SongsListProps {
  isPending: boolean
  songs?: SongsList
}

const DEFAULT_SKELETON_CARDS_COUNT = 4

export default function SongsList({isPending, songs}: SongsListProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-6">
      {isPending
        ? Array(DEFAULT_SKELETON_CARDS_COUNT)
            .fill({})
            .map((skeleton, index) => <SongCardSkeleton key={`song-${index}`} />)
        : songs?.map((song, index) => <SongCard key={`song-${index}`} {...song} />)}
    </div>
  )
}

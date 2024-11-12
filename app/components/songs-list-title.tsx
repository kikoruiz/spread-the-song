import type {SongsList} from '@/domain'

interface SongsListTitleProps {
  isPending: boolean
  results?: SongsList
}

function getResultsTitle(songs: SongsList) {
  const separator = ' & '

  return songs.map(({service}) => service.name).join(separator)
}

export default function SongsListTitle({isPending, results}: SongsListTitleProps) {
  const hasResponse = Array.isArray(results)
  const hasResults = hasResponse && results.length > 0

  return (
    <header className={`font-light text-4xl text-center ${isPending ? 'animate-pulse' : 'animate-none'}`}>
      {isPending
        ? `Searching for results...`
        : hasResults
          ? `${results.length > 1 ? 'Results' : 'A result'} in ${getResultsTitle(results)}`
          : 'There are no results 😧'}
    </header>
  )
}

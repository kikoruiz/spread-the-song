import type {SongsList} from '@/domain'

interface SongsListTitleProps {
  isPending: boolean
  results?: SongsList
}

function getResultsTitle(songs: SongsList) {
  const separator = ', '
  const lastSeparator = ' and '
  const results = songs.map(({service}) => service.name)

  return results.slice(0, -1).join(separator) + lastSeparator + results.slice(-1)
}

export default function SongsListTitle({isPending, results}: SongsListTitleProps) {
  const hasResponse = Array.isArray(results)
  const hasResults = hasResponse && results.length > 0

  return (
    <header className={`font-thin text-4xl text-center ${isPending ? 'animate-pulse' : 'animate-none'}`}>
      {isPending ? (
        `Searching for results...`
      ) : hasResults ? (
        <>
          {results.length > 1 ? 'Results' : 'A result'} in <b>{getResultsTitle(results)}</b>
        </>
      ) : (
        'There are no results 😧'
      )}
    </header>
  )
}

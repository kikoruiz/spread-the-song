'use client'

import {useActionState, useState} from 'react'
import {searchSong} from '@/app/lib/actions'
import SongCard from './components/song-card'
import SongCardSkeleton from './components/song-card-skeleton'
import SearchTitle from './components/search-title'
import Search from './components/search'
import type {SearchFieldErrors} from './lib/schemas'

const DEFAULT_SKELETON_CARDS_COUNT = 2

export default function Home() {
  const [songs, formAction, isPending] = useActionState(searchSong, undefined)
  const [errors, setErrors] = useState<SearchFieldErrors>()
  const hasResponse = Array.isArray(songs)
  const hasResults = hasResponse && songs.length > 0

  function handleError(errors?: SearchFieldErrors) {
    setErrors(errors)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <Search action={formAction} errors={errors} hasResults={hasResults} onError={handleError} />

      <div className="container max-w-6xl flex flex-col gap-12 py-12 px-6">
        {(hasResponse || isPending) && <SearchTitle isPending={isPending} results={songs} />}

        <div className="grid grid-cols-1 lg:grid-cols-2 justify-center gap-6">
          {isPending
            ? Array(DEFAULT_SKELETON_CARDS_COUNT)
                .fill({})
                .map((skeleton, index) => <SongCardSkeleton key={`song-${index}`} />)
            : songs?.map((song, index) => <SongCard key={`song-${index}`} {...song} />)}
        </div>
      </div>
    </div>
  )
}

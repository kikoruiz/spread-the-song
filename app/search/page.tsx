'use client'

import {useActionState, useEffect, useState} from 'react'
import {searchSong} from '../lib/actions'
import type {SearchFieldErrors} from '../lib/schemas'
import SearchForm from '../components/search-form'
import SongsList from '../components/songs-list'
import SongsListTitle from '../components/songs-list-title'
import {useTransitions} from '../hooks/use-transitions'

export default function SearchPage() {
  const {slideIntoViewport} = useTransitions()
  const [songs, formAction, isPending] = useActionState(searchSong, undefined)
  const [errors, setErrors] = useState<SearchFieldErrors>()
  const hasResponse = Array.isArray(songs)
  const hasResults = hasResponse && songs.length > 0

  useEffect(() => {
    slideIntoViewport()
  }, []) // eslint-disable-line

  function handleError(errors?: SearchFieldErrors) {
    setErrors(errors)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <SearchForm action={formAction} errors={errors} hasResults={hasResults} onError={handleError} />

      <div className="container max-w-6xl flex flex-col gap-12 py-12 px-6">
        {(hasResponse || isPending) && <SongsListTitle isPending={isPending} results={songs} />}

        <SongsList isPending={isPending} songs={songs} />
      </div>
    </div>
  )
}

'use client'

import {useActionState, useEffect, useState} from 'react'
import {convertSong} from '../lib/actions'
import type {ConvertFieldErrors} from '../lib/schemas'
import ConvertForm from '../components/convert-form'
import SongsList from '../components/songs-list'
import SongsListTitle from '../components/songs-list-title'
import {useTransitions} from '../hooks/use-transitions'

export default function ConvertPage() {
  const {slideIntoViewport} = useTransitions()
  const [songs, formAction, isPending] = useActionState(convertSong, undefined)
  const [errors, setErrors] = useState<ConvertFieldErrors>()
  const hasResponse = Array.isArray(songs)
  const hasResults = hasResponse && songs.length > 0

  useEffect(() => {
    slideIntoViewport()
  }, []) // eslint-disable-line

  function handleError(errors?: ConvertFieldErrors) {
    setErrors(errors)
  }

  return (
    <div className="flex flex-col justify-center items-center">
      <ConvertForm action={formAction} errors={errors} hasResults={hasResults} onError={handleError} />

      <div className="container max-w-6xl flex flex-col gap-12 py-12 px-6">
        {(hasResponse || isPending) && <SongsListTitle isPending={isPending} results={songs} />}

        <SongsList isPending={isPending} songs={songs} />
      </div>
    </div>
  )
}

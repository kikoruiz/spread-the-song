'use client'

import {useEffect, useState} from 'react'
import type {ConvertFieldErrors} from '../lib/schemas'
import ConvertForm from '../components/convert-form'
import SongsList from '../components/songs-list'
import SongsListTitle from '../components/songs-list-title'
import useTransitionContext from '../hooks/use-transition'
import useStateContext from '../hooks/use-state'

export default function ConvertPage() {
  const {slideIntoViewport} = useTransitionContext()
  const {convertState} = useStateContext()
  const [{results}, formAction, isPending] = convertState
  const [errors, setErrors] = useState<ConvertFieldErrors>()
  const hasResponse = Array.isArray(results)
  const hasResults = hasResponse && results.length > 0

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
        {(hasResponse || isPending) && <SongsListTitle isPending={isPending} results={results} />}

        <SongsList isPending={isPending} songs={results} />
      </div>
    </div>
  )
}

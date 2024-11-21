'use client'

import {useEffect, useState} from 'react'
import type {SearchFieldErrors} from '../lib/schemas'
import SearchForm from '../components/search-form'
import SongsList from '../components/songs-list'
import SongsListTitle from '../components/songs-list-title'
import useTransitionContext from '../hooks/use-transition'
import useStateContext from '../hooks/use-state'

export default function SearchPage() {
  const {slideIntoViewport} = useTransitionContext()
  const {searchState} = useStateContext()
  const [{results}, formAction, isPending] = searchState
  const [errors, setErrors] = useState<SearchFieldErrors>()
  const hasResponse = Array.isArray(results)
  const hasResults = hasResponse && results.length > 0

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
        {(hasResponse || isPending) && <SongsListTitle isPending={isPending} results={results} />}

        <SongsList isPending={isPending} songs={results} />
      </div>
    </div>
  )
}

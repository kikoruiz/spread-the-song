'use client'

import {useActionState, useMemo, type PropsWithChildren} from 'react'
import StateContext, {type ConvertState, type SearchState} from '../contexts/state-context'
import {convertSong, searchSong} from '../lib/actions'

const useValue = () => {
  const searchState = useActionState(searchSong, {} as SearchState)
  const convertState = useActionState(convertSong, {} as ConvertState)

  return useMemo(() => ({searchState, convertState}), [searchState, convertState])
}

export default function ParamsProvider({children}: PropsWithChildren) {
  return <StateContext.Provider value={useValue()}>{children}</StateContext.Provider>
}

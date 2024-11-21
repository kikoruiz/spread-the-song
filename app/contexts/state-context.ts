import {createContext} from 'react'
import type {ConvertParams, SearchParams, SongsList} from '@/domain'

type ActionState<Params> = {
  params: Params
  results: SongsList | undefined
}

export type SearchState = ActionState<SearchParams>
export type ConvertState = ActionState<ConvertParams>

type FormAction = (payload: FormData) => void

export interface StateContext {
  searchState: [SearchState, FormAction, boolean]
  convertState: [ConvertState, FormAction, boolean]
}

export default createContext({} as StateContext)

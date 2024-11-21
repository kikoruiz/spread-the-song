'use server'

import {ConvertParamsSchema, SearchParamsSchema, type ConvertParams, type SearchParams} from '@/domain'
import type {ConvertState, SearchState} from '../contexts/state-context'
import {convert, search} from './http'

export async function searchSong(state: SearchState, formData: FormData) {
  const params = SearchParamsSchema.parse(Object.fromEntries(formData))
  const results = await search(params as SearchParams)

  return {params, results}
}

export async function convertSong(state: ConvertState, formData: FormData) {
  const params = ConvertParamsSchema.parse(Object.fromEntries(formData))
  const results = await convert(params as ConvertParams)

  return {params, results}
}

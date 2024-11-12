'use server'

import {convertSchema, searchSchema} from './schemas'
import type {ConvertParams, SearchParams, SongsList} from '@/domain'
import {convert, search} from './http'

export async function searchSong(state: SongsList | undefined, formData: FormData) {
  const params = searchSchema.parse(Object.fromEntries(formData))
  const songsList = await search(params as SearchParams)

  return songsList
}

export async function convertSong(state: SongsList | undefined, formData: FormData) {
  const params = convertSchema.parse(Object.fromEntries(formData))
  const songsList = await convert(params as ConvertParams)

  return songsList
}

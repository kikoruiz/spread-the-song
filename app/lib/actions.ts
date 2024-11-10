'use server'

import {searchSchema} from './schemas'
import type {SearchParams, SongsList} from '@/domain'
import {search} from './http'

export async function searchSong(state: SongsList | undefined, formData: FormData) {
  const params = searchSchema.parse(Object.fromEntries(formData))
  const songsList = await search(params as SearchParams)

  return songsList
}

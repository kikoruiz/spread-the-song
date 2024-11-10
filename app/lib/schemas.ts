import {z} from 'zod'

const DEFAULT_MIN_CHARACTERS = 2

const inputSchema = z.string().min(1, {message: 'error'}).min(DEFAULT_MIN_CHARACTERS, {message: 'error-min'}).nullish()

export const searchSchema = z.object({
  name: inputSchema,
  artist: inputSchema
})

export type SearchType = z.infer<typeof searchSchema>
export type SearchErrorType = z.inferFlattenedErrors<typeof searchSchema>
export type SearchFieldErrors = SearchErrorType['fieldErrors']

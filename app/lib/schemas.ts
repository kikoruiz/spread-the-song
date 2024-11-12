import {z} from 'zod'

const DEFAULT_MIN_CHARACTERS = 2

const inputSchema = z
  .string()
  .min(1, {message: 'error-empty'})
  .min(DEFAULT_MIN_CHARACTERS, {message: 'error-min'})
  .nullish()

export const searchSchema = z.object({
  name: inputSchema,
  artist: inputSchema
})

export const convertSchema = z.object({
  url: z.string().url({message: 'error-invalid'}).nullish()
})

export type SearchType = z.infer<typeof searchSchema>
export type SearchErrorType = z.inferFlattenedErrors<typeof searchSchema>
export type SearchFieldErrors = SearchErrorType['fieldErrors']
export type ConvertType = z.infer<typeof convertSchema>
export type ConvertErrorType = z.inferFlattenedErrors<typeof convertSchema>
export type ConvertFieldErrors = ConvertErrorType['fieldErrors']

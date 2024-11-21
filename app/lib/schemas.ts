import {z} from 'zod'
import type {ConvertParamsSchema, SearchParamsSchema} from '@/domain/schemas'

export type SearchType = z.infer<typeof SearchParamsSchema>
export type SearchErrorType = z.inferFlattenedErrors<typeof SearchParamsSchema>
export type SearchFieldErrors = SearchErrorType['fieldErrors']
export type ConvertType = z.infer<typeof ConvertParamsSchema>
export type ConvertErrorType = z.inferFlattenedErrors<typeof ConvertParamsSchema>
export type ConvertFieldErrors = ConvertErrorType['fieldErrors']

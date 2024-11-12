import {useEffect, useRef, useState, type FormEvent} from 'react'
import {useTranslations} from 'next-intl'
import {searchSchema, type SearchFieldErrors} from '@/app/lib/schemas'
import {Root, Submit} from '@radix-ui/react-form'
import {ArrowRightIcon} from '@radix-ui/react-icons'
import FormField from './form-field'
import type {SearchParams} from '@/domain'

interface SearchFormProps {
  action: (payload: FormData) => void
  errors?: SearchFieldErrors
  hasResults: boolean
  onError: (errors?: SearchFieldErrors) => void
}

const searchFields = searchSchema.keyof().options

export default function SearchForm({action, errors, hasResults, onError}: SearchFormProps) {
  const t = useTranslations('search')
  const [params, setParams] = useState({} as SearchParams)
  const firstInputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent) {
    const formData = new FormData(event.target as HTMLFormElement)
    const params = (searchFields as string[]).reduce(
      (params, field) => ({...params, [field]: Object.fromEntries(formData)[field]}),
      {} as SearchParams
    )
    const {error} = searchSchema.safeParse(params)

    setParams(params)
    if (error) {
      onError(error.formErrors?.fieldErrors)
      event.preventDefault()
    } else {
      onError()
    }
  }

  useEffect(() => {
    if (firstInputRef.current) {
      firstInputRef.current.focus()
    }
  }, [])

  return (
    <Root action={action} onSubmit={handleSubmit} className="container py-12 max-w-screen-sm flex flex-col gap-3 px-6">
      {searchFields.map((field, index) => {
        const [errorMessage] = errors?.[field] ?? []

        return (
          <FormField
            key={field}
            ref={index === 0 ? firstInputRef : null}
            name={field}
            value={params && !hasResults ? params?.[field] : ''}
            title={t(`fields.${field}.label`)}
            errorMessage={errorMessage && t(`fields.${field}.messages.${errorMessage}`)}
          />
        )
      })}

      <Submit className="max-w-min flex items-center gap-1.5 self-end py-3 px-6 rounded-lg appearance-none bg-gradient-to-b from-pink-400 to-pink-500 border-transparent font-black text-white text-lg drop-shadow-md transition-all hover:ring-2 hover:ring-pink-700 hover:drop-shadow-lg focus:outline-none focus:border-transparent focus:ring-2 focus:ring-pink-700">
        {t('submit')}

        <ArrowRightIcon className="size-4" />
      </Submit>
    </Root>
  )
}

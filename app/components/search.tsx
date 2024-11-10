import {useState, type FormEvent} from 'react'
import {useTranslations} from 'next-intl'
import {searchSchema, type SearchFieldErrors} from '@/app/lib/schemas'
import {Root, Submit} from '@radix-ui/react-form'
import {ArrowRightIcon} from '@radix-ui/react-icons'
import SearchField from './search-field'
import type {SearchParams} from '@/domain'

interface SearchProps {
  action: (payload: FormData) => void
  errors?: SearchFieldErrors
  hasResults: boolean
  onError: (errors?: SearchFieldErrors) => void
}

const searchFields = [...searchSchema.keyof().options]

export default function Search({action, errors, hasResults, onError}: SearchProps) {
  const t = useTranslations('search')
  const [params, setParams] = useState({} as SearchParams)

  function handleSubmit(event: FormEvent) {
    const formData = new FormData(event.target as HTMLFormElement)
    const params = searchFields.reduce(
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

  return (
    <Root action={action} onSubmit={handleSubmit} className="container py-12 max-w-screen-sm flex flex-col gap-3 px-6">
      {searchFields.map(field => {
        const [errorMessage] = errors?.[field] ?? []

        return (
          <SearchField
            key={field}
            name={field}
            value={params && !hasResults ? params?.[field] : ''}
            errorMessage={errorMessage}
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

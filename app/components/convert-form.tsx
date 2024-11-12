import {useEffect, useRef, useState, type FormEvent} from 'react'
import {useTranslations} from 'next-intl'
import {convertSchema, type ConvertFieldErrors} from '@/app/lib/schemas'
import {Root, Submit} from '@radix-ui/react-form'
import {ArrowRightIcon} from '@radix-ui/react-icons'
import FormField from './form-field'
import type {ConvertParams} from '@/domain'

interface ConvertFormProps {
  action: (payload: FormData) => void
  errors?: ConvertFieldErrors
  hasResults: boolean
  onError: (errors?: ConvertFieldErrors) => void
}

const convertFields = convertSchema.keyof().options

export default function ConvertForm({action, errors, hasResults, onError}: ConvertFormProps) {
  const t = useTranslations('convert')
  const [params, setParams] = useState({} as ConvertParams)
  const firstInputRef = useRef<HTMLInputElement>(null)

  function handleSubmit(event: FormEvent) {
    const formData = new FormData(event.target as HTMLFormElement)
    const params = (convertFields as string[]).reduce(
      (params, field) => ({...params, [field]: Object.fromEntries(formData)[field]}),
      {} as ConvertParams
    )
    const {error} = convertSchema.safeParse(params)

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
      {convertFields.map((field, index) => {
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

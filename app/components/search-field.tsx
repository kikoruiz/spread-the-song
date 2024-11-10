import {useTranslations} from 'next-intl'
import {Field, Label, Control, Message} from '@radix-ui/react-form'
import {ExclamationTriangleIcon} from '@radix-ui/react-icons'

interface SearchFieldProps {
  name: string
  value: string
  errorMessage: string
}

export default function SearchField({name, value, errorMessage}: SearchFieldProps) {
  const t = useTranslations('search.fields')
  const isInvalid = Boolean(errorMessage)
  const title = t(`${name}.label`)

  return (
    <Field key={name} name={name} serverInvalid={isInvalid}>
      <Label aria-hidden className="hidden">
        {title}
      </Label>

      <Control
        type="text"
        defaultValue={value}
        placeholder={title}
        className="w-full p-3 rounded-lg appearance-none bg-gradient-to-b from-slate-100 drop-shadow-md ring-2 ring-white transition-all duration-300 hover:ring-pink-200 focus:outline-none focus:ring-pink-300 data-[invalid]:ring-2 data-[invalid]:ring-red-500 data-[invalid]:rounded-bl-none"
      />

      {isInvalid && (
        <Message className="relative top-0.5 inline-flex items-center gap-1.5 mb-3 py-1 px-3 bg-red-500 ring-2 ring-red-500 rounded-b-lg font-light text-sm text-white drop-shadow-md">
          <ExclamationTriangleIcon className="size-3" />

          {t(`${name}.messages.${errorMessage}`)}
        </Message>
      )}
    </Field>
  )
}

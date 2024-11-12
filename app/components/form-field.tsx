import {forwardRef, type InputHTMLAttributes, type PropsWithChildren, type Ref} from 'react'
import {Field, Label, Control, Message} from '@radix-ui/react-form'
import {ExclamationTriangleIcon} from '@radix-ui/react-icons'

interface FormFieldProps
  extends PropsWithChildren<Pick<InputHTMLAttributes<HTMLInputElement>, 'name' | 'value' | 'className'>> {
  title: string
  errorMessage?: string
}

function FormField({name, value, title, className, errorMessage}: FormFieldProps, ref: Ref<HTMLInputElement>) {
  const isInvalid = Boolean(errorMessage)

  return (
    <Field key={name} name={name as string} className={className} serverInvalid={isInvalid}>
      <Label aria-hidden className="hidden">
        {title}
      </Label>

      <Control
        ref={ref}
        type={name === 'url' ? 'url' : 'text'}
        defaultValue={value}
        placeholder={title}
        className="w-full p-3 rounded-lg appearance-none bg-gradient-to-b from-slate-100 drop-shadow-md ring-2 ring-white transition-all duration-300 hover:ring-pink-200 focus:outline-none focus:ring-pink-300 data-[invalid]:ring-2 data-[invalid]:ring-red-500 data-[invalid]:rounded-bl-none"
      />

      {isInvalid && (
        <Message className="relative top-0.5 inline-flex items-center gap-1.5 mb-3 py-1 px-3 bg-red-500 ring-2 ring-red-500 rounded-b-lg font-light text-sm text-white drop-shadow-md">
          <ExclamationTriangleIcon className="size-3" />

          {errorMessage}
        </Message>
      )}
    </Field>
  )
}

export default forwardRef(FormField)

import {getRequestConfig} from 'next-intl/server'

const DEFAULT_LOCALE = 'en'

export default getRequestConfig(async () => {
  const locale = DEFAULT_LOCALE

  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default
  }
})

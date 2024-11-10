import NodeCache from '@cacheable/node-cache'

const storage = new NodeCache({
  stdTTL: 3600,
  checkperiod: 120,
  useClones: false
})

export const getKey = (url: string) => {
  const buffer = Buffer.from(url)
  const key = buffer.toString('base64')

  return key
}

export default storage

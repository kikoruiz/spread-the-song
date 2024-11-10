import type {Song} from '../schemas'

export default class Mapper {
  public static create() {
    throw new Error('[Mapper#create] must be implemented.')
  }

  getDurationTime(duration: number): string {
    const date = new Date(duration)
    const minutes = date.getMinutes()
    const seconds = date.getSeconds()

    return [`${minutes}`, `${seconds}`]
      .map(time => (time.length === 1 ? `0${time}` : time))
      .join(':')
  }

  // eslint-disable-next-line
  map(data: unknown): Song | undefined {
    throw new Error('[Mapper#map] must be implemented.')
  }
}

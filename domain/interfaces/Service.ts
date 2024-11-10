export default class Service {
  public static create() {
    throw new Error('[Service#create] must be implemented.')
  }

  // eslint-disable-next-line
  execute(params: unknown) {
    throw new Error('[Service#execute] must be implemented.')
  }
}

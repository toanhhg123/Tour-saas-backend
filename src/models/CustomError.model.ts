export class ResponseError {
  public status!: number
  public message!: string
  public additionalInfo!: unknown

  constructor(message: string, status = 400, additionalInfo = {}) {
    this.message = message
    this.status = status
    this.additionalInfo = additionalInfo
  }
}

export class CustomError {
  public status!: number
  public message!: string
  public additionalInfo!: unknown

  constructor(message: string, status = 500, additionalInfo = {}) {
    this.message = message
    this.status = status
    this.additionalInfo = additionalInfo
  }
}

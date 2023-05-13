export default interface IResponseObject<T> {
  message: string
  element: T
  status: string
}

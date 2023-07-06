export interface IPageAction {
  _search?: string
  _page?: number
  _totalPage?: number
  [_fiilter: string]: string | number | undefined | unknown
}

export interface IPageActionResponse<T>
  extends IPageAction {
  data: T
}

export const initPageAction: IPageAction = {
  _page: 1
}

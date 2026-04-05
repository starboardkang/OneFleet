export type ApiListResponse<TItem> = {
  data: TItem[]
}

export type ApiSingleResponse<TItem> = {
  data: TItem
}

export type ApiPagination = {
  page: number
  pageSize: number
  total: number
}

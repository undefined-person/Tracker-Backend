export interface ITop250Full {
  id: string
  rank: string
  title: string
  fullTitle: string
  year: string
  image: string
  crew: string
  imDbRating: string
  imDbRatingCount: string
}

export type ITop250 = Omit<ITop250Full, 'crew' | 'imDbRatingCount' | 'fullTitle'>

export interface ITop250AxiosResponse {
  items: Array<ITop250Full>
}

export interface ITop250 {
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

export interface ITop250AxiosResponse {
  items: Array<ITop250>
}
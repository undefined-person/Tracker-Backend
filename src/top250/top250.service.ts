import { Injectable } from "@nestjs/common";
import { ITop250, ITop250AxiosResponse } from "./types/top250.interface";
import { api } from "@app/utils/api";

@Injectable()
export class Top250Service {

  async getTop250TV(req: any): Promise<ITop250[]> {
    const response = await api.get<ITop250AxiosResponse>(`/Top250TVs/${process.env.IMDB_KEY}`).then(res => res.data.items)

    return response.map(({ imDbRatingCount, crew, fullTitle, ...rest }) => {
      return rest
    })
  }

  async getTop250Movies():Promise<ITop250[]> {
    const response = await api.get<ITop250AxiosResponse>(`/Top250TVs/${process.env.IMDB_KEY}`).then(res => res.data.items)

    return response.map(({ imDbRatingCount, crew, fullTitle, ...rest }) => {
      return rest
    })
  }

  handleSort = (shows: ITop250[], type: string) => {
    return shows.sort((a, b) => (a[`${type}`] > b[`${type}`] ? 1 : b[`${type}`] > a[`${type}`] ? -1 : 0))
  }
}

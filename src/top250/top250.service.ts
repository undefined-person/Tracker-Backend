import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { ITop250, ITop250AxiosResponse } from './types/top250Response.interface'
import axios from 'axios'

@Injectable()
export class Top250Service {
  constructor(private readonly httpService: HttpService) {}

  async getTop250TV(body: any): Promise<ITop250[]> {
    const tvShows = await axios.get<ITop250AxiosResponse>(`https://imdb-api.com/en/API/Top250TVs/${process.env.APP_KEY}`).then(res => res.data.items)
    console.log('tvShows', tvShows)

    if (body.type) {
      return this.handleSort(tvShows, body.type)
    } else return tvShows
  }

  getTop250Movies(): Observable<any> {
    return this.httpService.get(`https://imdb-api.com/en/API/Top250Movies/${process.env.APP_KEY}`).pipe(map(res => res.data.items))
  }

  handleSort = (shows: ITop250[], type: string) => {
    return shows.sort((a, b) => (a[`${type}`] > b[`${type}`] ? 1 : b[`${type}`] > a[`${type}`] ? -1 : 0))
  }
}

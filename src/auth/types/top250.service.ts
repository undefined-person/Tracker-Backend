import { HttpService } from '@nestjs/axios'
import { Injectable } from '@nestjs/common'
import { map, Observable } from 'rxjs'
import { ITop250 } from './types/top250Response.interface'

@Injectable()
export class Top250Service {
  constructor(private readonly httpService: HttpService) {}

  getTop250TV(query: any): any {
    console.log('query', query)
    const res = this.httpService.get(`https://imdb-api.com/en/API/Top250TVs/${process.env.APP_KEY}`).pipe(map(res => res.data))
    console.log('res', res.isArray())

    this.handleSort(res, Object.keys(query)[0])
  }

  getTop250Movies(): Observable<any> {
    return this.httpService.get(`https://imdb-api.com/en/API/Top250Movies/${process.env.APP_KEY}`).pipe(map(res => res.data.items))
  }

  handleSort = (object: any, type: any) => {
    console.log('object', typeof object)

    console.log('type', type)
    console.log(
      'sort',
      object.sort((a, b) => a - b)
    )
  }
}

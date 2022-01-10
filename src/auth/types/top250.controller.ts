import { Top250Service } from './top250.service'
import { Controller, Get, Query } from '@nestjs/common'
import { Public } from '@app/auth/decorators'
import { Observable } from 'rxjs'

@Controller()
export class Top250Controller {
  constructor(private readonly top250: Top250Service) {}

  @Public()
  @Get('top250TV')
  getTop250tv(@Query() query: any): Observable<any> {
    return this.top250.getTop250TV(query)
  }

  @Public()
  @Get('top250Movies')
  getTop250Movies(): Observable<any> {
    return this.top250.getTop250Movies()
  }
}

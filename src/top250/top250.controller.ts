import { Top250Service } from './top250.service'
import { Body, Controller, Get, Post, Query } from '@nestjs/common'
import { Public } from '@app/auth/decorators'
import { Observable } from 'rxjs'

@Controller()
export class Top250Controller {
  constructor(private readonly top250: Top250Service) {}

  @Public()
  @Post('top250TV')
  async getTop250tv(@Body() body: any) {
    return await this.top250.getTop250TV(body)
  }

  @Public()
  @Get('top250Movies')
  getTop250Movies(): Observable<any> {
    return this.top250.getTop250Movies()
  }
}

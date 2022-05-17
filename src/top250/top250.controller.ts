import { Top250Service } from './top250.service'
import { Controller, Get, Query } from "@nestjs/common";
import { Public } from '@app/auth/decorators'

@Controller()
export class Top250Controller {
  constructor(private readonly top250: Top250Service) {}

  @Public()
  @Get('top250TV')
  async getTop250tv(@Query() query) {
    return await this.top250.getTop250TV(query)
  }

  @Public()
  @Get('top250Movies')
  getTop250Movies(){
    return this.top250.getTop250Movies()
  }
}

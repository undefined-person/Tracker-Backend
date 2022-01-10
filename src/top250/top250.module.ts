import { HttpModule } from '@nestjs/axios'
import { Module } from '@nestjs/common'
import { Top250Controller } from './top250.controller'
import { Top250Service } from './top250.service'

@Module({
  controllers: [Top250Controller],
  providers: [Top250Service],
  imports: [HttpModule],
})
export class Top250Module {}

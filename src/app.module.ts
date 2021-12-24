import { AtGuard } from './auth/guards/at.guard'
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import ormConfig from '@app/ormconfig'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), HttpModule, AuthModule, ConfigModule.forRoot()],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}

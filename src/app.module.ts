import { AtGuard } from './auth/guards/at.guard'
import { Module } from '@nestjs/common'
import { HttpModule } from '@nestjs/axios'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import ormConfig from '@app/ormconfig'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { Top250Module } from './top250/top250.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), HttpModule, AuthModule, ConfigModule.forRoot(), Top250Module],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}

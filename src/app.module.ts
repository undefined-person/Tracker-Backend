import { AtGuard } from "@app/auth/guards"
import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { AuthModule } from './auth/auth.module'
import ormConfig from '@app/ormconfig'
import { ConfigModule } from '@nestjs/config'
import { APP_GUARD } from '@nestjs/core'
import { Top250Module } from './top250/top250.module'
import { MediaModule } from './media/media.module';

@Module({
  imports: [TypeOrmModule.forRoot(ormConfig), AuthModule, ConfigModule.forRoot(), Top250Module, MediaModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}

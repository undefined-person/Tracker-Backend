import { NestFactory } from '@nestjs/core'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'

async function start() {
  const app = await NestFactory.create(AppModule)
  app.use(cookieParser())
  app.enableCors({credentials: true, origin: process.env.CLIENT_URL});
  await app.listen(process.env.PORT).then(() => {
    console.log(`Server is started on port ${process.env.PORT}`)
  })
}

start()

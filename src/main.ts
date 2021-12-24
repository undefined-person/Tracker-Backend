import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function start() {
  const app = await NestFactory.create(AppModule)
  await app.listen(process.env.PORT).then(() => {
    console.log(`Server is started on port ${process.env.PORT}`)
  })
}

start()

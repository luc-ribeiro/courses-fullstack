import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { MicroserviceOptions, Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableShutdownHooks()

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'classroom',
        brokers: ['localhost:29092'],
      }
    }
  })

  await app.startAllMicroservices().then(() => {
    console.log('[Classroom] Microservice started!')
  })

  await app.listen(3334).then(() => {
    console.log('[Classroom] HTTP server started!')
  })
}
bootstrap()

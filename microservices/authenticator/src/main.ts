import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

  async function bootstrap() {

    const me = 'http://localhost:3051';
    const bus = 'http://localhost:3060';
  
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.enableCors({
      origin: "*",
    });
  
    /* config redis connection with ESB */
    const REDIS_PORT = 6379;
    const REDIS_HOST = 'localhost';
    const TotalConnections = 50
  
    const pool = require('redis-connection-pool')('myRedisPool', {
      host: REDIS_HOST,
      port: REDIS_PORT,
      max_clients: TotalConnections,
      perform_checks: false,
      database: 0,
    });
    console.log('connected to redis');
  
    /* ensure that I am subscribed to the service bus channel */
    pool.hget('channel', 'subscribers', async (err: any, data: any) => {
      const subscribers = JSON.parse(data) || [];
      const subscribed = subscribers ? subscribers.includes(me) : false;
      if (!subscribed) {
        subscribers.push(me);
        pool.hset('channel', 'subscribers', JSON.stringify(subscribers), () => {
          console.log('Subscribed successfully.');
        });
      }
      else {
        console.log('Already subscribed.');
      }
    })
  
    await app.listen(3051);
  
  }
  bootstrap();
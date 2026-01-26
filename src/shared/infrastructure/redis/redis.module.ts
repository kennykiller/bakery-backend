import { Global, Module } from '@nestjs/common';
import { REDIS_CLIENT, redisClientProvider } from './redis.client';
import { RedisClientService } from './redis-client.service';

@Global()
@Module({
  providers: [redisClientProvider, RedisClientService],
  exports: [REDIS_CLIENT],
})
export class RedisModule {}

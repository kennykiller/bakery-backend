import { Module } from '@nestjs/common';
import { RedisModule } from '../redis/redis.module';
import { CACHE_STORE } from 'src/shared/domain/cache/cache-store.token';
import { RedisCacheAdapter } from './redis-cache.adapter';

@Module({
  imports: [RedisModule],
  providers: [
    {
      provide: CACHE_STORE,
      useClass: RedisCacheAdapter,
    },
  ],
  exports: [CACHE_STORE],
})
export class CacheModule {}

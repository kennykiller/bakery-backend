import { RedisClientService } from './redis-client.service';

export const REDIS_CLIENT = 'REDIS_CLIENT'

export const redisClientProvider = {
    useFactory: (redisService: RedisClientService) => redisService.getClient(),
    provide: REDIS_CLIENT,
    inject: [RedisClientService]
}
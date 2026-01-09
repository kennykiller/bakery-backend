// import { Module } from '@nestjs/common';
// import { CacheModule } from '@nestjs/cache-manager';
// import { ConfigService } from '@nestjs/config';
// import * as redisStore from 'cache-manager-redis-store';

// @Module({
//   imports: [
//     CacheModule.registerAsync({
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => ({
//         store: redisStore as any,
//         url: config.get<string>('REDIS_URL'),
//       }),
//       isGlobal: true,
//     }),
//   ],
// })
// export class RedisModule {}

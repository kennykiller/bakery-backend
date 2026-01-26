import { Inject, Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import Redis from 'ioredis';
import redisConfig from 'src/core/config/databases/redis.config';

@Injectable()
export class RedisClientService implements OnModuleDestroy, OnModuleInit {
  private client: Redis;
  constructor(
    @Inject(redisConfig.KEY)
    private readonly config: ConfigType<typeof redisConfig>,
  ) {}

  onModuleInit() {
    this.client = new Redis({
      host: this.config.host,
      password: this.config.password,
      username: this.config.username,
      port: this.config.port,
    });
  }

  getClient(): Redis {
    return this.client;
  }

  async onModuleDestroy() {
    if (this.client) {
      await this.client.quit();
    }
  }
}

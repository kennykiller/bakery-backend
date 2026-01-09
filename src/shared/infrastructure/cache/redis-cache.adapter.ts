import { Inject, Injectable } from "@nestjs/common";
import { REDIS_CLIENT } from "../redis/redis.client";
import Redis from "ioredis";
import { CacheStore } from "src/shared/domain/cache/cache-store";

@Injectable()
export class RedisCacheAdapter implements CacheStore {
    constructor(
        @Inject(REDIS_CLIENT)
        private readonly redis: Redis
    ) {}

    async get<T>(key: string): Promise<T | null> {
        const value = await this.redis.get(key);

        return value ? JSON.parse(value) : null;
    }

    async set<T>(key: string, value: T, ttlSeconds?: number): Promise<void> {
        const payload = JSON.stringify(value);

        if (ttlSeconds) {
            await this.redis.set(key, payload, 'EX', ttlSeconds)
        } else {
            await this.redis.set(key, payload)
        }
    }

    async delete(key: string): Promise<void> {
        await this.redis.del(key)
    }
}
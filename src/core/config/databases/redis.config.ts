import ev from 'env-var';
import { registerAs } from '@nestjs/config';

const REDIS_TOKEN = Symbol('redis');

export interface IRedisConfig {
  host: string;
  password?: string;
  port: number;
  username?: string;
}

export default registerAs<IRedisConfig>(REDIS_TOKEN, () => ({
  host: ev.get('REDIS_HOST').default('localhost').asString(),
  password: ev.get('REDIS_PASSWORD').asString(),
  port: ev.get('REDIS_PORT').default(6379).asInt(),
  username: ev.get('REDIS_USERNAME').asString(),
}));

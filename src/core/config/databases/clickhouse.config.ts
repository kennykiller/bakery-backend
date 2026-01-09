import { registerAs } from '@nestjs/config';
import ev from 'env-var';

const CLICKHOUSE_TOKEN = Symbol('clickhouse')

export interface IClickhouseConfig {
  url: string;
  port: number;
  username: string;
  password: string;
}

export const clickhouseConfig = registerAs<IClickhouseConfig>(
  CLICKHOUSE_TOKEN,
  () => ({
    url: ev.get('CH_HOST').default('localhost').asString(),
    password: ev.get('CH_PASSWORD').default('admin').asString(),
    port: ev.get('CH_PORT').default(8443).asInt(),
    username: ev.get('CH_USER').default('admin').asString(),
  }),
);

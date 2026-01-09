import { registerAs } from "@nestjs/config";
import ev from 'env-var';

export interface IPostgresConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database?: string;
}

export const POSTGRES_CONFIG_KEY = 'postgres';
export const postgresConfig = registerAs<IPostgresConfig>(
    POSTGRES_CONFIG_KEY, 
    () => ({
        host: ev.get('POSTGRES_HOST').default('localhost').asString(),
        password: ev.get('POSTGRES_PASSWORD').default('password').asString(),
        port: ev.get('POSTGRES_PORT').default(5432).asInt(),
        username: ev.get('POSTGRES_USERNAME').default('postgres').asString(),
        database: ev.get('POSTGRES_DATABASE').default('postgres').asString()
    })
);
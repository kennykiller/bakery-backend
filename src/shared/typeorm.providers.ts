import { ConfigType } from '@nestjs/config';
import { postgresConfig } from 'src/core/config/databases/postgres.config';
import { DataSource } from 'typeorm';

export const POSTGRES_SOURCE = Symbol('POSTGRES_SOURCE');

export const databaseProviders = [
    {   
        provide: POSTGRES_SOURCE,
        useFactory: async (config: ConfigType<typeof postgresConfig>) => {
            console.log(config, 'config');
            console.log(__dirname, 'dirname')
            
            const dataSource = new DataSource({
                type: 'postgres',
                host: config.host,
                port: config.port,
                username: config.username,
                password: config.password,
                database: config.database || 'postgres',
                entities: [__dirname + '/../../**/*.orm-entity.js'],
                synchronize: false,
                logging: true,
            });

            return await dataSource.initialize();
        },
        inject: [postgresConfig.KEY]
    }
];
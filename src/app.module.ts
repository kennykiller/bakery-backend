import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { clickhouseConfig } from './core/config/databases/clickhouse.config';
import { postgresConfig } from './core/config/databases/postgres.config';
import redisConfig from './core/config/databases/redis.config';
import { RedisModule } from './shared/infrastructure/redis/redis.module';
import { GetIpMiddleware } from './core/middlewares/get-ip..middleware';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmCustomModule } from './shared/typeorm.module';
import { CatalogModule } from './modules/catalog/catalog.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [clickhouseConfig, postgresConfig, redisConfig],
    }),
    TypeOrmCustomModule,
    RedisModule,
    AuthModule,
    UsersModule,
    CatalogModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(GetIpMiddleware).forRoutes('*');
  }
}

import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './typeorm.providers';

@Global()
@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class TypeOrmCustomModule {}

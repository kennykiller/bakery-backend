import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'KAFKA_CLIENT',
        inject: [ConfigService],
        useFactory: (config: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: config.get<string>('KAFKA_BROKERS')?.split(',') as string[],
            },
            consumer: {
              groupId: config.get<string>('KAFKA_GROUP') as string,
            },
          },
        }),
      },
    ]),
  ],
  exports: ['KAFKA_CLIENT'],
})
export class KafkaModule {}

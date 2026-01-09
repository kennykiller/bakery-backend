// import { Module } from '@nestjs/common';
// import { ClickHouse } from 'clickhouse';
// import { ConfigService } from '@nestjs/config';

// @Module({
//   providers: [
//     {
//       provide: 'CLICKHOUSE',
//       inject: [ConfigService],
//       useFactory: (config: ConfigService) => {
//         return new ClickHouse({
//           url: config.get('CH_HOST'),
//           port: config.get('CH_PORT'),
//           debug: false,
//           basicAuth: {
//             username: config.get('CH_USER'),
//             password: config.get('CH_PASSWORD'),
//           },
//         });
//       },
//     },
//   ],
//   exports: ['CLICKHOUSE'],
// })
// export class ClickhouseModule {}

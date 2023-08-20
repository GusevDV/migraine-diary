import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import databaseConfig from '../config/database.config';
import { ImportsModule } from '../import/imports.module';

process.env.DATABASE_HOST;

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const username = configService.get<string>('database.username');
        const password = configService.get<string>('database.password');
        const host = configService.get<string>('database.host');
        const port = configService.get<number>('database.port');
        const dbName = configService.get<string>('database.dbName');

        return {
          uri: `mongodb://${username}:${password}@${host}:${port}`,
          dbName,
        };
      },
      inject: [ConfigService],
    }),
    ImportsModule,
  ],
})
export class AppModule {}

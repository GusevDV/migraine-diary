import { ConfigService, registerAs } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export default registerAs('database', () => ({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 27017,
  dbName: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
}));

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export const getMongoConfig = async (
  configService: ConfigService
): Promise<MongooseModuleOptions> => {
  const username = configService.get<string>('database.username');
  const password = configService.get<string>('database.password');
  const host = configService.get<string>('database.host');
  const port = configService.get<number>('database.port');
  const dbName = configService.get<string>('database.dbName');
  return {
    uri: `mongodb://${username}:${password}@${host}:${port}`,
    dbName,
    ...getMongoOptions(),
  };
};

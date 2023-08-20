import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';
import { ImportSchema } from './schemas/import.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Import', schema: ImportSchema }])],
  controllers: [ImportController],
  providers: [ImportService],
})
export class ImportsModule {}

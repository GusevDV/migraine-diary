import { Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as fs from 'fs';

import { ImportResponseDto } from './dto/import-response.dto';
import { ImportService } from './import.service';

@Controller('imports')
export class ImportController {
  constructor(private readonly importService: ImportService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './files',
      }),
    })
  )
  async create(@UploadedFile() file: Express.Multer.File) {
    // TODO needs to improve
    const createImportDto = this.importService.parse(fs.readFileSync(file.path));

    const result = await this.importService.create(createImportDto);
    const responseDto = new ImportResponseDto();
    responseDto.id = result._id.toString();
    responseDto.records = result.records;

    return responseDto;
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ImportResponseDto> {
    const result = await this.importService.findOne(id);

    const responseDto = new ImportResponseDto();
    responseDto.id = result._id.toString();
    responseDto.records = result.records;

    return responseDto;
  }
}

import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import xlsx from 'node-xlsx';

import { CreateImportDto } from './dto/create-import.dto';
import { ImportDto } from './dto/import.dto';
import { IImport } from './interfaces/import.interface';

@Injectable()
export class ImportService {
  constructor(@InjectModel('Import') private importModel: Model<IImport>) {}

  /**
   * Creates a new Import record.
   * @param createImportDto - DTO for creating a DataImport record.
   * @returns Newly created Import record.
   */
  async create(createImportDto: CreateImportDto) {
    try {
      const newImport = await this.importModel.create(createImportDto);
      return newImport.save();
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error creating data import record.');
    }
  }

  /**
   * Fetches an Import record by its ID.
   * @param id - ID of the Import record.
   * @returns Import record if found, otherwise throws a NotFoundException.
   */
  async findOne(id: string) {
    const existingImport = await this.importModel.findById(id).exec();
    if (!existingImport) {
      throw new NotFoundException(`Import #${id} not found`);
    }
    return existingImport;
  }

  /**
   * Parses a buffer containing XLSX data to produce a DataImport record.
   * Assumes XLSX structure with dates formatted as "dd.mm.yyyy".
   * @param buffer - Buffer containing XLSX data.
   * @returns Parsed Import record.
   */
  parse(buffer: Buffer): IImport {
    try {
      const workSheets = xlsx.parse(buffer, {
        sheets: 0,
      });

      const workSheetData = workSheets[0].data as Array<Array<string>>;

      const preparedData: ImportDto[] = [];

      for (let i = 1; i < workSheetData.length; i++) {
        const [date, , headache] = workSheetData[i];

        if (!date || !headache) {
          continue;
        }

        const [day, month, year] = date.split('.');
        const timestamp = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
        preparedData.push({
          timestamp,
          headache: headache.toLowerCase() === 'да',
        });
      }

      return {
        records: preparedData,
      };
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException('Error parsing XLSX/CSV data.');
    }
  }
}

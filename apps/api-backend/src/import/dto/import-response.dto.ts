import { IsArray } from 'class-validator';
import { ImportDto } from './import.dto';

export class ImportResponseDto {
  id: string;
  @IsArray()
  records: ImportDto[];
}

import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model, ObjectId } from 'mongoose';
import { ImportService } from './import.service';
import { Import } from './schemas/import.schema';

const mockImport = {
  records: [{ timestamp: 1672863474, headache: true }],
};

describe('ImportService', () => {
  let service: ImportService;
  let model: Model<Import>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImportService,
        {
          provide: getModelToken('Import'),
          useValue: {
            constructor: jest.fn().mockResolvedValue(mockImport),
            find: jest.fn(),
            create: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ImportService>(ImportService);
    model = module.get<Model<Import>>(getModelToken('Import'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new import', async () => {
    const mockInstance = {
      _id: '123131312' as unknown as ObjectId,
      save: jest.fn().mockResolvedValue({ records: [{ timestamp: 1672863474, headache: true }] }),
    };

    jest.spyOn(model, 'create').mockResolvedValueOnce(mockInstance as any);

    const newImport = await service.create({
      records: [{ timestamp: 1672863474, headache: true }],
    });

    expect(newImport).toEqual(mockImport);
  });
});

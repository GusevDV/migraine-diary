import { Test, TestingModule } from '@nestjs/testing';
import mockfs = require('mock-fs');
import mongoose from 'mongoose';
import * as fs from 'fs';
import { Readable } from 'stream';
import { CreateImportDto } from './dto/create-import.dto';
import { ImportController } from './import.controller';
import { ImportService } from './import.service';

const file: Express.Multer.File = {
  fieldname: 'file.csv',
  originalname: 'file.csv',
  path: './files/file.csv',
  stream: new Readable(),
  encoding: '1',
  size: 1,
  destination: '',
  filename: '',
  mimetype: 'text/csv',
  buffer: Buffer.from('one,two,three'),
};

afterAll(() => {
  mockfs.restore();
});

describe('ImportController', () => {
  let controller: ImportController;
  let service: ImportService;

  const createImportDto: CreateImportDto = {
    records: [{ timestamp: 1672863474, headache: true }],
  };

  const mockImport = {
    _id: new mongoose.Types.ObjectId('63b5e128f7285a274efba552'),
    records: [{ timestamp: 1672863474, headache: true }],
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImportController],
      providers: [
        {
          provide: ImportService,
          useValue: {
            findOne: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId('63b5e128f7285a274efba552'),
              records: [{ timestamp: 1672863474, headache: true }],
            }),
            create: jest.fn().mockResolvedValue(createImportDto),
            parse: jest.fn().mockResolvedValue({
              _id: new mongoose.Types.ObjectId('63b5e128f7285a274efba552'),
              records: [{ timestamp: 1672863474, headache: true }],
            }),
          },
        },
      ],
    }).compile();

    controller = module.get<ImportController>(ImportController);
    service = module.get<ImportService>(ImportService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new import and return data', async () => {
      mockfs({
        './files/file.csv': Buffer.from([8, 6, 7, 5, 3, 0, 9]),
      });

      const response = {
        id: '63b5e128f7285a274efba552',
        records: [{ timestamp: 1672863474, headache: true }],
      };

      const createSpy = jest.spyOn(service, 'create').mockResolvedValue(mockImport as any);

      const parseSpy = jest.spyOn(service, 'parse').mockReturnValue(mockImport as any);

      await controller.create(file);
      expect(createSpy).toHaveBeenCalled();
      expect(parseSpy).toHaveBeenCalledWith(fs.readFileSync(file.path));

      await expect(controller.create(file)).resolves.toEqual(response);
    });
  });

  describe('findOne', () => {
    it('should return the document', async () => {
      await expect(controller.findOne('63b5e128f7285a274efba552')).resolves.toEqual({
        id: '63b5e128f7285a274efba552',
        records: [
          {
            timestamp: 1672863474,
            headache: true,
          },
        ],
      });
      expect(service.findOne).toHaveBeenCalled();
    });
  });
});

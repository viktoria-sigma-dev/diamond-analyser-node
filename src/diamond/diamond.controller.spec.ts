import { Test, TestingModule } from '@nestjs/testing';
import { DiamondController } from './diamond.controller';
import { DiamondService } from './diamond.service';
import {
  IDiamondPriceRequestData,
  IDiamondPriceResponseData,
  ISimilarDiamondResponseData,
  ISimilarItemsRequestData,
} from './interfaces/diamond.interface';
import { ConfigModule } from '@nestjs/config';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';
import { describe } from 'node:test';

describe('DiamondController', () => {
  let controller: DiamondController;
  let service: DiamondService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), CacheManagerModule],
      controllers: [DiamondController],
      providers: [DiamondService],
    }).compile();

    controller = moduleRef.get(DiamondController);
    service = moduleRef.get(DiamondService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('Calculate. Should call the calculate method and return the result', async () => {
    const requestParams: IDiamondPriceRequestData = {
      cut: 'Round',
      carat: 1,
      color: 'D',
      clarity: 'IF',
    };
    const responseData: IDiamondPriceResponseData = {
      price: 10,
      min: 10,
      max: 10,
      avg: 10,
      count: 0,
    };

    jest
      .spyOn(service, 'calculate')
      .mockImplementation(() => Promise.resolve(responseData));

    const result = await controller.calculate(requestParams);

    expect(service.calculate).toHaveBeenCalledWith(requestParams);
    expect(result).toBe(responseData);
  });

  it('Get similar products. Should call the getSimilarItems method and return the result', async () => {
    const requestParams: ISimilarItemsRequestData = {
      cut: 'Round',
      budget: '100',
    };
    const responseData: ISimilarDiamondResponseData[] = [
      {
        id: '1',
        shape: '1',
        price: 100,
        carat: '1',
        clarity: 'F',
        imgUrl: 'placeholder',
      },
    ];

    jest
      .spyOn(service, 'getSimilarItems')
      .mockImplementation(() => Promise.resolve(responseData));

    const result = await controller.getSimilarItems(requestParams);

    expect(service.getSimilarItems).toHaveBeenCalledWith(requestParams);
    expect(result).toBe(responseData);
  });
});

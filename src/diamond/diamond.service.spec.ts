import { Test, TestingModule } from '@nestjs/testing';
import { DiamondService } from './diamond.service';
import { ConfigModule } from '@nestjs/config';
import { CacheManagerModule } from '../cache-manager/cache-manager.module';
import { DiamondController } from './diamond.controller';
import {
  IDiamondPriceRequestData,
  IDiamondPriceResponseData,
} from './interfaces/diamond.interface';

describe('DiamondService', () => {
  let service: DiamondService;

  beforeAll(() => {
    // process.env.DIAMOND_CALCULATOR_OFFLINE = 'true';
  });

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), CacheManagerModule],
      controllers: [DiamondController],
      providers: [DiamondService],
    }).compile();

    service = moduleRef.get(DiamondService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Calculate. Should call the calculate method and return the result', async () => {
    const requestParams: IDiamondPriceRequestData = {
      cut: 'Round',
      carat: 1,
      color: 'D',
      clarity: 'IF',
      useOfflineCalculator: true,
    };
    const responseData: IDiamondPriceResponseData = {
      price: 1003,
      min: 902.7,
      max: 1103.3,
      avg: 1003,
      count: 0,
    };

    jest.spyOn(service, 'calculate');

    const result = await service.calculate(requestParams);

    expect(service.calculate).toHaveBeenCalledWith(requestParams);
    expect(result).toEqual(responseData);
  });
});

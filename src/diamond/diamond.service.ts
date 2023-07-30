import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import axios from 'axios';
import { CacheManager } from '../cache-manager/cache-manager';
import {
  IDiamondPriceRequestData,
  IDiamondPriceResponseData,
  ISimilarDiamondResponseData,
  ISimilarItemsRequestData,
  ISimilarProductsData,
} from './interfaces/diamond.interface';
import { parseXml } from '../util/parseXml';
import {
  AVAILABLE_SIMILAR_DIAMONDS_CUT,
  FALLBACK_SIMILAR_DIAMOND_CUT,
  FALLBACK_SIMILAR_DIAMOND_METAL,
  FALLBACK_SIMILAR_DIAMOND_SETTING,
} from './constants/diamond';
import {
  calculateDiamondPrice,
  getMaxDiamondPrice,
  getMinDiamondPrice,
} from '../util/calculateDiamondPrice';

@Injectable()
export class DiamondService {
  private readonly logger = new Logger(DiamondService.name);
  private readonly maxProductsLength = 4;

  constructor(private readonly cacheManager: CacheManager) {}

  async calculate({
    useOfflineCalculator,
    ...params
  }: IDiamondPriceRequestData): Promise<IDiamondPriceResponseData> {
    if (useOfflineCalculator === 'true') {
      return this.calculateOffline(params);
    }

    const cachedData: IDiamondPriceResponseData | null =
      await this.cacheManager.getAsync<IDiamondPriceResponseData | null>(
        JSON.stringify(params),
      );

    if (cachedData) {
      this.logger.log(
        `Cached price data for ${JSON.stringify(params)} were found.`,
      );
      return cachedData;
    }

    const result: IDiamondPriceResponseData = await this.getPrice(params);

    if (Number.isNaN(Number(result.price))) {
      throw new BadRequestException('Price does not exist for selected values');
    }

    await this.cacheManager.setAsync(JSON.stringify(params), result);

    return result;
  }

  async getSimilarItems(
    params: ISimilarItemsRequestData,
  ): Promise<ISimilarDiamondResponseData[]> {
    const filters: ISimilarItemsRequestData = {
      cut: AVAILABLE_SIMILAR_DIAMONDS_CUT.includes(params.cut)
        ? params.cut
        : FALLBACK_SIMILAR_DIAMOND_CUT,
      budget: params.budget,
    };
    const cachedData: any | null = await this.cacheManager.getAsync<
      ISimilarDiamondResponseData[] | null
    >(JSON.stringify(filters));

    if (cachedData) {
      this.logger.log(
        `Cached similar products for ${JSON.stringify(filters)} were found.`,
      );
      return cachedData;
    }

    const similarProducts: ISimilarDiamondResponseData[] =
      await this.fetchSimilarProducts(filters);

    const result = similarProducts.slice(0, this.maxProductsLength);
    await this.cacheManager.setAsync(JSON.stringify(params), result);

    return result;
  }

  private async getPrice(
    params: IDiamondPriceRequestData,
  ): Promise<IDiamondPriceResponseData> {
    try {
      const response = await axios.get(
        `${process.env.DIAMOND_CALCULATOR_SOURCE}`,
        {
          params: { ...params, SID: process.env.DIAMOND_CALCULATOR_SOURCE_SID },
        },
      );

      this.logger.log(`Requested get price for ${JSON.stringify(params)}`);

      return parseXml(response.data);
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later',
      );
    }
  }

  private async fetchSimilarProducts(
    params: ISimilarItemsRequestData,
  ): Promise<ISimilarDiamondResponseData[]> {
    try {
      const { data }: { data: { data: ISimilarProductsData[] } } =
        await axios.get(`${process.env.DIAMOND_SIMILAR_PRODUCTS_SOURCE}`, {
          params: {
            shape: AVAILABLE_SIMILAR_DIAMONDS_CUT.includes(params.cut)
              ? params.cut
              : FALLBACK_SIMILAR_DIAMOND_CUT,
            budget: params.budget,
            setting: FALLBACK_SIMILAR_DIAMOND_SETTING,
            metal: FALLBACK_SIMILAR_DIAMOND_METAL,
          },
        });

      this.logger.log(
        `Requested fetch similar products for ${JSON.stringify(params)}`,
      );

      return data.data.map((similarDiamond) => ({
        id: similarDiamond.DiamondID,
        shape: similarDiamond.Shape,
        price: similarDiamond.Price,
        carat: similarDiamond.Carat,
        clarity: similarDiamond.Clarity,
        imgUrl: similarDiamond.GCSPublicURLs[0],
      }));
    } catch (error) {
      this.logger.error(error.message);
      throw new InternalServerErrorException(
        'Something went wrong, please try again later',
      );
    }
  }

  private async calculateOffline(
    params: IDiamondPriceRequestData,
  ): Promise<IDiamondPriceResponseData> {
    this.logger.log(`Calculate price offline for ${JSON.stringify(params)}.`);
    const price: number = calculateDiamondPrice(params);
    return {
      price: price,
      min: getMinDiamondPrice(price),
      max: getMaxDiamondPrice(price),
      avg: price,
      count: 0,
    };
  }
}

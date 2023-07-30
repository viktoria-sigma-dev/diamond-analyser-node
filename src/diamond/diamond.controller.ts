import { Controller, Get, Query, UsePipes } from '@nestjs/common';
import { DiamondService } from './diamond.service';
import {
  IDiamondPriceRequestData,
  IDiamondPriceResponseData,
  ISimilarDiamondResponseData,
  ISimilarItemsRequestData,
} from './interfaces/diamond.interface';
import { CalculateValidationPipe } from '../pipes/diamond/calculateValidation.pipe';
import { SimilarProductsValidationPipe } from '../pipes/diamond/getSimilarDiamondsValidation.pipe';

@Controller('diamond')
export class DiamondController {
  constructor(private readonly diamondService: DiamondService) {}

  @Get('/calculate')
  @UsePipes(new CalculateValidationPipe())
  calculate(
    @Query() params: IDiamondPriceRequestData,
  ): Promise<IDiamondPriceResponseData> {
    return this.diamondService.calculate(params);
  }

  @Get('/get-similar-products')
  @UsePipes(new SimilarProductsValidationPipe())
  getSimilarItems(
    @Query() params: ISimilarItemsRequestData,
  ): Promise<ISimilarDiamondResponseData[]> {
    return this.diamondService.getSimilarItems(params);
  }
}

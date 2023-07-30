import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { IDiamondPriceRequestData } from '../../diamond/interfaces/diamond.interface';

@Injectable()
export class CalculateValidationPipe implements PipeTransform {
  readonly allowedProperties: string[] = [
    'cut',
    'color',
    'carat',
    'clarity',
    'make',
    'certificate',
    'useOfflineCalculator',
  ];

  transform(value: IDiamondPriceRequestData, metadata: ArgumentMetadata) {
    const properties: string[] = Object.keys(value);
    if (
      metadata.type !== 'query' ||
      properties.some(
        (property) => !this.allowedProperties.includes(property),
      ) ||
      Object.values(value).some((item) => !item)
    ) {
      throw new BadRequestException(`Validation failed for provided values`);
    }
    return value;
  }
}

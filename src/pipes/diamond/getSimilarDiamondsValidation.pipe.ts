import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { ISimilarItemsRequestData } from '../../diamond/interfaces/diamond.interface';

@Injectable()
export class SimilarProductsValidationPipe implements PipeTransform {
  readonly allowedProperties: string[] = ['cut', 'budget'];

  transform(value: ISimilarItemsRequestData, metadata: ArgumentMetadata) {
    const properties: string[] = Object.keys(value);
    if (
      metadata.type !== 'query' ||
      properties.some(
        (property) => !this.allowedProperties.includes(property),
      ) ||
      Object.values(value).some((item) => !item) ||
      !Number(value.budget) ||
      Number.isNaN(Number(value.budget))
    ) {
      throw new BadRequestException(`Validation failed for provided values`);
    }
    return value;
  }
}

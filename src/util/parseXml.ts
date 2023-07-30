import { parseStringPromise } from 'xml2js';
import { InternalServerErrorException } from '@nestjs/common';

export const parseXml = async <ParsedType>(
  responseData: string,
): Promise<any> => {
  const xmlValueIndex = 0;
  try {
    const parsedData = await parseStringPromise(responseData);

    const data = parsedData.pr;

    return Object.entries(data).reduce((acc, [key, value]) => {
      const numberValue = Number(value[xmlValueIndex]);
      acc[key] = Number.isNaN(numberValue) ? value[xmlValueIndex] : numberValue;
      return acc;
    }, {} as ParsedType);
  } catch (e) {
    throw new InternalServerErrorException(
      e.message ?? `Data cannot be parsed, ${responseData}`,
    );
  }
};

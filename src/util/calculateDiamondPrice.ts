import {
  DIAMOND_PRICE_FACTORS,
  MAX_PRICE_MULTIPLICATOR,
  MIN_PRICE_MULTIPLICATOR,
} from '../diamond/constants/diamondPriceFactors';
import { IDiamondPriceRequestData } from '../diamond/interfaces/diamond.interface';

export const calculateDiamondPrice = ({
  cut,
  carat,
  color,
  clarity,
  certificate,
  make,
}: IDiamondPriceRequestData): number => {
  const basePrice: number = DIAMOND_PRICE_FACTORS.cuts[cut] || 0;
  const caratPrice: number = carat * 1000;
  const colorPrice: number = DIAMOND_PRICE_FACTORS.colors[color] || 0;
  const clarityPrice: number = DIAMOND_PRICE_FACTORS.clarities[clarity] || 0;
  const certificatePrice: number = certificate
    ? DIAMOND_PRICE_FACTORS.certificates[certificate] || 0
    : 0;
  const makePrice: number = make ? DIAMOND_PRICE_FACTORS.make[make] || 0 : 0;

  return (
    basePrice +
    caratPrice +
    colorPrice +
    clarityPrice +
    certificatePrice +
    makePrice
  );
};

export const getMinDiamondPrice = (price: number) =>
  price - price * MIN_PRICE_MULTIPLICATOR;
export const getMaxDiamondPrice = (price: number) =>
  price + price * MAX_PRICE_MULTIPLICATOR;

export interface IDiamondPriceRequestData {
  cut: string;
  carat: number;
  color: string;
  clarity: string;
  make?: string;
  certificate?: string;
  useOfflineCalculator?: string;
}

export interface ISimilarItemsRequestData {
  cut: string;
  budget: string;
}

export interface IDiamondPriceResponseData {
  price: number | string;
  min: number | string;
  max: number | string;
  avg: number | string;
  count: number | string;
}

export interface ISimilarProductsData {
  DiamondID: string;
  Shape: string;
  Price: number;
  Carat: string;
  Clarity: string;
  GCSPublicURLs: string[];
}

export interface ISimilarDiamondResponseData {
  id: string;
  shape: string;
  price: number;
  carat: string;
  clarity: string;
  imgUrl: string;
}

export interface IDiamondPriceFactors {
  cuts: {
    Round: number;
    Marquise: number;
    Pear: number;
    Oval: number;
    Heart: number;
    Emerald: number;
    Princess: number;
    Radiant: number;
    Triangle: number;
    Baguette: number;
    Asscher: number;
    Cushion: number;
  };
  colors: {
    D: number;
    E: number;
    F: number;
    G: number;
    H: number;
    I: number;
    J: number;
    K: number;
    L: number;
    M: number;
    N: number;
    O: number;
    P: number;
  };
  clarities: {
    IF: number;
    VVS1: number;
    VVS2: number;
    VS1: number;
    VS2: number;
    SI1: number;
    SI2: number;
    SI3: number;
    I1: number;
    I2: number;
    I3: number;
  };
  certificates: {
    AGS: number;
    CEGL: number;
    CGI: number;
    CGL: number;
    DCLA: number;
    'EGL Asia': number;
    'EGL Intl.': number;
    'EGL USA': number;
    GCAL: number;
    GIA: number;
    HRD: number;
    IGI: number;
  };
  make: {
    Ideal: number;
    Excellent: number;
    'Very Good': number;
    Good: number;
    Fair: number;
    Poor: number;
  };
};

export type Category = {
  id: number;
  attributes: {
    name: string;
    image?: string;
    publishedAt: string;
    createdAt: string;
    updatedAt: string;
  };
};
export type CategoriesType = Category[];

export type Measure = {
  id: number;
  attributes: {
    name: string;
    base_unit: string;
    Conversion_factor: number;
    publishedAt?: string;
    createdAt?: string;
    updatedAt?: string;
  };
};

export type MeasuresType = Measure[];

export type Products = Product[];
export interface Product {
  id: number;
  attributes: {
    name: string;
    code: string;
    price: number;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
    quantity?: number;
    images: {
      data: Image[] | null;
    };
    category: {
      data: Category | null;
    };
    unit_of_measure: {
      data: Measure | null;
    };
  };
}

export interface Image {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: ImageFormat;
      small: ImageFormat;
      medium: ImageFormat;
      large: ImageFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any | null; 
    createdAt: string;
    updatedAt: string;
  };
}

interface ImageFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface CartType {
  id: number;
  attributes: {
    name: string;
    desc?: string;
    completed?: boolean;
    products: Products | [];
  };
}
export type CartsType = CartType[];
// cartProduct Type:
export type CartProduct = {
  id: number;
  attributes: {
    product: {
      data: {
        product: Product;
        id: number;
      };
    };
    cart: {
      data: {
        cart: CartType;
        id: number;
      };
    };
    quantity: number;
    createdAt?: string;
    updatedAt?: string;
    publishedAt?: string;
  };
};

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
    createdAt: string;
    updatedAt: string;
  };
};

export type MeasuresType = Measure[];

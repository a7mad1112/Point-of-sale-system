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

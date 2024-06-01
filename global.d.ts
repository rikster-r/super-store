type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: {
    rate: number;
    count: number;
  };
};

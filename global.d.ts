interface Product {
  _id: number;
  _updatedAt: string;
  _createdAt: string;
  _rev: string;
  _type: string;
  title: string;
  price: number;
  description: string;
  category: string;
  imageUrl: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface Item extends Product {
  count: number;
}

type Cart = Map<number, Item>;

type cartAction = {
  type: string;
  item?: Product;
};

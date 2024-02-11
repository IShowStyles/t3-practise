import ProductShowCase from '~/app/_components/containers/ProductShowCase';
import { PizzaSize } from '~/server/api/routers/pizza';

export interface IProductItem {
  image: string;
  name: string;
  size: PizzaSize;
  price: number;
  description: string;
}

const data: IProductItem[] = [
  {
    image: '/public/products/28.png',
    name: 'Pepperoni Pizza',
    size: PizzaSize.Medium,
    price: 10.99,
    description: 'Classic pepperoni pizza with mozzarella cheese and tomato sauce.',
  },
  {
    image: '/public/products/28.png',
    name: 'Pepperoni Pizza',
    size: PizzaSize.Medium,
    price: 10.99,
    description: 'Classic pepperoni pizza with mozzarella cheese and tomato sauce.',
  },
  {
    image: '/public/products/14.png',
    name: 'pizza1',
    size: PizzaSize.Large,
    price: 12.99,
    description: 'Delicious vegetarian pizza loaded with fresh vegetables and cheese.',
  },
  {
    image: '/public/products/14.png',
    name: 'pizza',
    size: PizzaSize.Small,
    price: 14.99,
    description: 'A meaty delight with pepperoni, sausage, bacon, and ham.',
  },
];

export default async function Home() {
  return (
    <>
      <ProductShowCase title={'Pizza Available'} items={data} />
    </>
  );
}

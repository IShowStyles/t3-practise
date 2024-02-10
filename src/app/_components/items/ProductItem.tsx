import React, { useState } from 'react';
import Image from 'next/image';
import { PizzaSize } from '~/server/api/routers/pizza';

export interface IProductItem {
  image: string;
  name: string;
  size: PizzaSize;
  price: number;
  description: string;
}

type PizzaSizing = '25cm' | '35cm' | '50cm';

const ProductItem = ({ image, name, size, price, description }: IProductItem) => {
  const [isActive, setActive] = useState<{ size: PizzaSizing; isPastry: boolean }>({
    size: '25cm',
    isPastry: true,
  });

  const sizes: PizzaSizing[] = ['25cm', '35cm', '50cm'];

  return (
    <div className='flex flex-col'>
      <div>
        <Image alt={`pizza ${name}`} width={292} height={292} src={image} priority />
      </div>
      <p>{name}</p>
      <p>{description}</p>
      <div className='flex items-center gap-4'>
        {sizes.map((elem, idx) => (
          <span key={idx.toString()} className={`w-[30%] py-4 ${elem === isActive.size ? ' actived' : ''}`}>
            {elem}
          </span>
        ))}
      </div>
      <div>
        <span
          onClick={() => {
            setActive({
              ...isActive,
              isPastry: true,
            });
          }}
        >
          традиційне
        </span>
        <span
          onClick={() => {
            setActive({
              ...isActive,
              isPastry: false,
            });
          }}
        >
          тонке тісто
        </span>
      </div>
    </div>
  );
};

export default ProductItem;

'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { PizzaSize } from '~/server/api/routers/pizza';
import PizzaImg from '/public/products/14.png';
import Heading from '~/app/_components/ui/Heading';
import Text from '~/app/_components/ui/Text';

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

  const [priceCalc, setPriced] = useState(price);

  useEffect(() => {
    const calc =
      isActive.size === '25cm'
        ? price
        : isActive.size === '35cm'
          ? price * 1.15
          : isActive.size === '50cm'
            ? price * 1.4
            : 0;
    setPriced(Math.round(calc));
  }, [isActive.size]);

  const sizes: PizzaSizing[] = ['25cm', '35cm', '50cm'];

  return (
    <div className='relative flex w-full max-w-[30%] flex-col'>
      <div className='mb-3 flex justify-center'>
        <Image alt={`pizza ${name}`} width={292} height={292} src={PizzaImg} priority />
      </div>
      <Heading text={name} classes={'mb-3'} />
      <Text text={description} classNames={'text-xl font-medium text-gray-500 mb-3'} />
      <div className='mx-auto mb-1 flex w-[99%] justify-center gap-8 overflow-hidden rounded-2xl border-2 border-solid border-gray-400 bg-gray-200 px-2.5 py-1.5'>
        {sizes.map((elem, idx) => (
          <span
            onClick={() => {
              setActive({
                ...isActive,
                size: elem,
              });
            }}
            key={idx.toString()}
            className={`inline-flex w-[50%] items-center justify-center overflow-hidden rounded-2xl border-2 border-solid p-2 px-1.5 text-lg text-[#212112] transition-all duration-150 ease-linear  ${elem === isActive.size ? 'border-2 border-solid border-amber-400 bg-amber-200' : 'border-amber-200 bg-amber-100'}`}
          >
            {elem}
          </span>
        ))}
      </div>
      <div
        className={
          'mx-auto mb-1.5 flex w-[99%] justify-center gap-8 overflow-hidden rounded-2xl border-2 border-solid border-gray-400 bg-gray-200 px-2.5 py-1.5'
        }
      >
        <span
          className={`inline-flex w-[50%] items-center justify-center overflow-hidden rounded-2xl border-2 border-solid p-2 px-1.5 text-lg text-[#212112] transition-all duration-150 ease-linear ${isActive.isPastry ? 'border-2 border-solid border-amber-400 bg-amber-200' : 'border-amber-200 bg-amber-100'}`}
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
          className={`inline-flex w-[50%] items-center justify-center overflow-hidden rounded-2xl border-2 border-solid p-2 px-1.5 text-lg text-[#212112] transition-all duration-150 ease-linear ${!isActive.isPastry ? 'border-2 border-solid border-amber-400 bg-amber-200' : 'border-amber-200 bg-amber-100'}`}
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
      <div className={'flex items-center justify-between'}>
        <span className='border-2 border-solid border-[#212121] bg-green-300 px-3.5 py-0.5 text-xl text-[#212121]'>
          {priceCalc}$
        </span>
        <button className='ease-linear! border-2 border-solid border-amber-400 bg-amber-200 px-3.5 py-1.5 transition-all duration-300 hover:border-amber-300 hover:bg-amber-100'>
          Купити
        </button>
      </div>
    </div>
  );
};

export default ProductItem;

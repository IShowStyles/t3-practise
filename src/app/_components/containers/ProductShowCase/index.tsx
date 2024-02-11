import React from 'react';
import ProductItem, { IProductItem } from '~/app/_components/items/ProductItem';

const ProductShowCase = ({ items, title }: { items: IProductItem[]; title: string }) => {
  return (
    <section className='products section'>
      <div className='container'>
        <h1 className='mb-5 text-4xl font-bold text-[#212121]'>{title}</h1>
        <div className={'flex flex-wrap gap-5'}>
          {items.map((elem, idx) => (
            <ProductItem {...elem} key={idx} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowCase;

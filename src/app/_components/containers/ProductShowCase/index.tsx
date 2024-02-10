import React from 'react';
import ProductItem, { IProductItem } from '~/app/_components/items/ProductItem';

const ProductShowCase = ({ items }: { items: IProductItem[] }) => {
  return (
    <section className='products section'>
      <div className='container'>
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

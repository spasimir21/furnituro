import { Product } from '@services/product/interface/Product.interface';
import React from 'react';

function ProductCard({ product }: { product: Product }) {
  return (
    <div className='product'>
      <div className='product-image-container'>
        <img src='/public/assets/images/slytherin.png' alt='product cover' />
        {product.isNew && <p className='product-image-cover-text new'>New</p>}
      </div>
      <div className='rest'>
        <h5>{product.name}</h5>
        <p id='short-description'>{product.shortDescription}</p>
        <div className='price-container'>
          <h6 id='actual-price'>{product.price * 0.01}$</h6>
          <h6 id='price-without-discount'>
            <s>{product.originalPrice * 0.01}$</s>
          </h6>
        </div>
      </div>
      <div className='overlay'>
        <a href='#'>Add to cart</a>
        <div className='product-hover-icons'>
          <div className='share-wrapper'>
            <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M12 10.6667C11.4747 10.6667 11 10.8734 10.644 11.2047L5.94 8.46671C5.97333 8.31337 6 8.16004 6 8.00004C6 7.84004 5.97333 7.68671 5.94 7.53337L10.64 4.79337C11 5.12671 11.4733 5.33337 12 5.33337C13.1067 5.33337 14 4.44004 14 3.33337C14 2.22671 13.1067 1.33337 12 1.33337C10.8933 1.33337 10 2.22671 10 3.33337C10 3.49337 10.0267 3.64671 10.06 3.80004L5.36 6.54004C5 6.20671 4.52667 6.00004 4 6.00004C2.89333 6.00004 2 6.89337 2 8.00004C2 9.10671 2.89333 10 4 10C4.52667 10 5 9.79337 5.36 9.46004L10.0587 12.2054C10.0211 12.3563 10.0014 12.5112 10 12.6667C10 13.0623 10.1173 13.4489 10.3371 13.7778C10.5568 14.1067 10.8692 14.3631 11.2346 14.5145C11.6001 14.6658 12.0022 14.7054 12.3902 14.6283C12.7781 14.5511 13.1345 14.3606 13.4142 14.0809C13.6939 13.8012 13.8844 13.4448 13.9616 13.0569C14.0387 12.6689 13.9991 12.2668 13.8478 11.9013C13.6964 11.5359 13.44 11.2235 13.1111 11.0038C12.7822 10.784 12.3956 10.6667 12 10.6667Z'
                fill='white'
              />
            </svg>
            <p>Share</p>
          </div>
          <div className='compare-wrapper'>
            <svg width={16} height={16} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M10.08 7L11.08 8L14.52 4.55L11 1L10 2L11.8 3.8H2.00004V5.2H11.82L10.08 7ZM5.86004 9L4.86004 8L1.42004 11.5L4.91004 15L5.91004 14L4.10004 12.2H14V10.8H4.10004L5.86004 9Z'
                fill='white'
              />
            </svg>
            <p>Compare</p>
          </div>
          <div className='like-wrapper'>
            <svg width={28} height={28} viewBox='0 0 28 28' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M8.16668 3.5C4.94551 3.5 2.33334 6.08533 2.33334 9.275C2.33334 11.8498 3.35418 17.9608 13.4027 24.1383C13.5827 24.2479 13.7893 24.3058 14 24.3058C14.2107 24.3058 14.4173 24.2479 14.5973 24.1383C24.6458 17.9608 25.6667 11.8498 25.6667 9.275C25.6667 6.08533 23.0545 3.5 19.8333 3.5C16.6122 3.5 14 7 14 7C14 7 11.3878 3.5 8.16668 3.5Z'
                stroke='black'
                strokeWidth={2}
                strokeLinecap='round'
                strokeLinejoin='round'
              />
            </svg>
            <p>Like</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export { ProductCard };


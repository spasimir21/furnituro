import React from 'react';

export default function Home() {
  return (
    <>
      <div
        className='hero'
        style={{
          backgroundImage: `url('/public/assets/images/hero.png')`
        }}
      >
        <div className='hero-text-container'>
          <h3>New Arrival</h3>
          <h2>Discover Our New Collection</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis.</p>
          <button type='button'>Buy Now</button>
        </div>
      </div>
      <main>
        <div className='categories'>
          <div className='category-heading-wrapper'>
            <h2>Browse The Range</h2>
            <h3>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</h3>
          </div>
          <div className='category-wrapper'>
            <div>
              <img src='/public/assets/images/dining.png' alt='dining' />
              <h4>Dining</h4>
            </div>
            <div>
              <img src='/public/assets/images/living.png' alt='living' />
              <h4>Living</h4>
            </div>
            <div>
              <img src='/public/assets/images/bedroom.png' alt='bedroom' />
              <h4>Bedroom</h4>
            </div>
          </div>
        </div>
        <div className='products'>
          <div className='product-heading-title'>
            <h2>Our Products</h2>
          </div>
          <div className='product-container'>
            <div className='product'>
              <div className='product-image-container'>
                <img src='/public/assets/images/slytherin.png' alt='product cover' />
                <p className='product-image-cover-text new'>New</p>
              </div>
              <div className='rest'>
                <h5>Syltherin</h5>
                <p id='short-description'>Stylish cafe chair</p>
                <div className='price-container'>
                  <h6 id='actual-price'>Rp 2.500.000</h6>
                  <h6 id='price-without-discount'>
                    <s>Rp 3.500.000</s>
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
            <div className='product'>
              <div className='product-image-container'>
                <img src='/public/assets/images/slytherin.png' alt='product cover' />
                <p className='product-image-cover-text new'>New</p>
              </div>
              <div className='rest'>
                <h5>Syltherin</h5>
                <p id='short-description'>Stylish cafe chair</p>
                <div className='price-container'>
                  <h6 id='actual-price'>Rp 2.500.000</h6>
                  <h6 id='price-without-discount'>
                    <s>Rp 3.500.000</s>
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
            <div className='product'>
              <div className='product-image-container'>
                <img src='/public/assets/images/slytherin.png' alt='product cover' />
                <p className='product-image-cover-text new'>New</p>
              </div>
              <div className='rest'>
                <h5>Syltherin</h5>
                <p id='short-description'>Stylish cafe chair</p>
                <div className='price-container'>
                  <h6 id='actual-price'>Rp 2.500.000</h6>
                  <h6 id='price-without-discount'>
                    <s>Rp 3.500.000</s>
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
            <div className='product'>
              <div className='product-image-container'>
                <img src='/public/assets/images/slytherin.png' alt='product cover' />
                <p className='product-image-cover-text new'>New</p>
              </div>
              <div className='rest'>
                <h5>Syltherin</h5>
                <p id='short-description'>Stylish cafe chair</p>
                <div className='price-container'>
                  <h6 id='actual-price'>Rp 2.500.000</h6>
                  <h6 id='price-without-discount'>
                    <s>Rp 3.500.000</s>
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
            <div className='product'>
              <div className='product-image-container'>
                <img src='/public/assets/images/slytherin.png' alt='product cover' />
                <p className='product-image-cover-text new'>New</p>
              </div>
              <div className='rest'>
                <h5>Syltherin</h5>
                <p id='short-description'>Stylish cafe chair</p>
                <div className='price-container'>
                  <h6 id='actual-price'>Rp 2.500.000</h6>
                  <h6 id='price-without-discount'>
                    <s>Rp 3.500.000</s>
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
          </div>
          <a href='#'>Show More</a>
        </div>
        <div className='carousel'>
          <div className='carousel-wrapper'>
            <div className='carousel-left'>
              <div className='carousel-left-header'>
                <h2>50+ Beautiful rooms inspiration</h2>
                <p>Our designer already made a lot of beautiful prototipe of rooms that inspire you</p>
              </div>
              <div className='carousel-left-rest'>
                <a href='#'>Explore More</a>
              </div>
            </div>
            <ul className='carousel-right'>
              <li className='item active-photo-container'>
                <div className='image-container'>
                  <img src='/public/assets/images/carousel-bedroom.png' alt='bedroom' />
                  <div className='carousel-all-container'>
                    <div className='carousel-text-container'>
                      <div className='room-type-container'>
                        <h3>01</h3>
                        <hr />
                        <h3>Bed Room</h3>
                      </div>
                      <p>Inner Peace</p>
                    </div>
                    <a href='#'>
                      <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M21 12H3M21 12L15 6M21 12L15 18'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
              <li className='item'>
                <div className='image-container'>
                  <img src='/public/assets/images/carousel-livingroom.png' alt='livingroom' />
                  <div className='carousel-all-container'>
                    <div className='carousel-text-container'>
                      <div className='room-type-container'>
                        <h3>02</h3>
                        <hr />
                        <h3>Living room</h3>
                      </div>
                      <p>Outer Peace</p>
                    </div>
                    <a href='#'>
                      <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M21 12H3M21 12L15 6M21 12L15 18'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
              <li className='item'>
                <div className='image-container'>
                  <img src='/public/assets/images/dining.png' alt='dining' />
                  <div className='carousel-all-container'>
                    <div className='carousel-text-container'>
                      <div className='room-type-container'>
                        <h3>03</h3>
                        <hr />
                        <h3>Diningroom</h3>
                      </div>
                      <p>idk</p>
                    </div>
                    <a href='#'>
                      <svg width={24} height={24} viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                        <path
                          d='M21 12H3M21 12L15 6M21 12L15 18'
                          stroke='white'
                          strokeWidth='1.5'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                        />
                      </svg>
                    </a>
                  </div>
                </div>
              </li>
            </ul>
            <div className='arrow-wrapper'>
              <div className='arrow' />
            </div>
          </div>
        </div>
        <div className='share'>
          <div className='share-heading'>
            <h2>Share your setup with</h2>
            <h3>#FuniroFurniture</h3>
          </div>
          <div className='share-container'>
            <div className='share-right'>
              <div className='share-top'>
                <img id='three-si' src='/public/assets/images/Rectangle 36.png' alt='grid-image' />
                <img id='three-ei' src='/public/assets/images/Rectangle 38.png' alt='grid-image' />
              </div>
              <div className='share-bottom'>
                <img id='three-se' src='/public/assets/images/Rectangle 37.png' alt='grid-image' />
                <img id='three-ni' src='/public/assets/images/Rectangle 39.png' alt='grid-image' />
              </div>
            </div>
            <div className='share-middle'>
              <img id='four-z' src='/public/assets/images/Rectangle 40.png' alt='grid-image' />
            </div>
            <div className='share-left'>
              <div className='share-top'>
                <img id='four-th' src='/public/assets/images/Rectangle 43.png' alt='grid-image' />
                <img id='four-fi' src='/public/assets/images/Rectangle 45.png' alt='grid-image' />
              </div>
              <div className='share-bottom'>
                <img id='four-o' src='/public/assets/images/Rectangle 41.png' alt='grid-image' />
                <img id='four-f' src='/public/assets/images/Rectangle 44.png' alt='grid-image' />
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer>
        <div className='footer-container'>
          <div className='branding'>
            <h1>Furniro.</h1>
            <div>
              <p className='grey'>420 University Drive Suite 200 Coral Gables,</p>
              <p className='grey'>FL 33134 USA</p>
            </div>
          </div>
          <div className='links'>
            <h4 className='grey'>Links</h4>
            <ul>
              <li>
                <a href='#'>Home</a>
              </li>
              <li>
                <a href='#'>Shop</a>
              </li>
              <li>
                <a href='#'>About</a>
              </li>
              <li>
                <a href='#'>Contact</a>
              </li>
            </ul>
          </div>
          <div className='help'>
            <h4 className='grey'>Help</h4>
            <ul>
              <li>
                <a href='#'>Payment Options</a>
              </li>
              <li>
                <a href='#'>Returns</a>
              </li>
              <li>
                <a href='#'>Privacy Policies</a>
              </li>
            </ul>
          </div>
          <div className='newsletter'>
            <h4 className='grey'>Newsletter</h4>
            <div className='subscribe-container'>
              <input type='email' placeholder='Enter Your Email Address' />
              <button type='submit'>SUBSCRIBE</button>
            </div>
          </div>
        </div>

        <div className='footer-end'>
          <p>2023 Furniro. All rights reserved</p>
        </div>
      </footer>
    </>
  );
}


import { Product } from '@/types'
import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

interface Props {
  product: Product;
}   
const ProductCard = ({ product } : Props) => {
  return (
    <Link className='product-card' href={`/products/${product.id}`}>
        <div className="product-card_img-container">
          <Image
            src={product.image}
            alt={product.title}
            width={200}
            height={200}
            className="product-card__image"
            />
        </div>
        <div className='flex flex-col gap-3'>
            <h3 className='product-title'>{product.title}</h3>
            <div className='flex justify-between'>
              <p className= "text-black opacity-50ctext-lg capitalize">{product.category}</p>
                <p className='text-black text-lg'>
                    <span>{product?.currency}</span>
                   <span> {product?.currentPrice}</span>
                </p>
            </div>
        </div>

    </Link>
  )
}

export default ProductCard

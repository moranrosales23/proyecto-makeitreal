import React from 'react';
import PropTypes from 'prop-types';
import './DetailProduct.css';

const DetailProduct = function DetailProduct({ title, price, description, category, image, rating }) {
  return (
    <div className='product-detail'>
      <div className='product-detail__img'>
        <img src={image} alt='product' className='img' />
      </div>
      <div className='product-detail__description'>
        <h3 className='product-detail__description--title'>{title}</h3>
        <small className='tag warn'>{rating.count} in stock</small>
        <h2 className='little-margin'>
          Price: <span className='product-detail__description--price'>${price}</span>
        </h2>
        <span className='tag info'>{category}</span>
        <p>{rating.rate}</p>
        <strong>About:</strong>
        <p className='product-detail__description--about'>{description}</p>
      </div>
    </div>
  );
};

DetailProduct.propTypes = {
  title: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  rating: PropTypes.shape({
    rate: PropTypes.number,
    count: PropTypes.number,
  }).isRequired,
};

export default DetailProduct;

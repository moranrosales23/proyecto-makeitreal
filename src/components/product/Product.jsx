import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Product.css';
import Modal from '../modal/Modal';
import DetailProduct from '../detail-product/DetailProduct';

const Product = function Product({ title, price, description, category, image, rating }) {
  const minMinute = 1;
  const maxMinute = 5;
  const milisecondsForSecond = 1000;
  const milisecondsForMinute = milisecondsForSecond * 60;
  const milisecondsForHour = milisecondsForMinute * 60;
  let interval = null;
  const [timer, settimer] = useState({});
  const [disabled, setdisabled] = useState(false);
  const [isOpenModal, setOpenModal] = useState(false);

  function isExpired(time) {
    return time <= 0;
  }

  function addZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  function convert(time) {
    const minutesRemaining = addZero(Math.floor((time % milisecondsForHour) / milisecondsForMinute));
    const secondsRemaining = addZero(Math.floor((time % milisecondsForMinute) / milisecondsForSecond));
    settimer({ minutesRemaining, secondsRemaining });
  }

  function countDown(stopTime) {
    const now = new Date();
    let timeRemaining = stopTime.getTime() - now.getTime();
    if (isExpired(timeRemaining)) {
      clearInterval(interval);
      setdisabled(true);
      timeRemaining = 0;
    }
    convert(timeRemaining);
  }

  useEffect(() => {
    const stopTime = new Date();
    const minutes = Math.floor(Math.random() * (maxMinute - minMinute)) + minMinute;
    stopTime.setTime(stopTime.getTime() + minutes * milisecondsForMinute);
    interval = setInterval(() => countDown(stopTime), milisecondsForSecond);
    countDown(stopTime);
  }, []);

  function showModal() {
    setOpenModal(true);
  }

  return (
    <>
      <div className='card'>
        <img src={image} alt='product' className='card__img' />
        <h3 className='card__title'>{title}</h3>
        <div className='card__actions'>
          <div>
            00:{timer.minutesRemaining}:{timer.secondsRemaining}
          </div>
          <button type='button' className='card__actions--detail' disabled={disabled} onClick={showModal}>
            Go to detail
          </button>
        </div>
      </div>
      {isOpenModal && (
        <Modal title='Information of Product' close={setOpenModal}>
          <DetailProduct image={image} category={category} price={price} title={title} description={description} rating={rating} />
        </Modal>
      )}
    </>
  );
};

Product.propTypes = {
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

export default Product;

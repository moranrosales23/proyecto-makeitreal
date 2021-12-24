import { React, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './Product.css';

const Product = function Product({ img, title }) {
  const minMinute = 1;
  const maxMinute = 5;
  const milisecondsForSecond = 1000;
  const milisecondsForMinute = milisecondsForSecond * 60;
  const milisecondsForHour = milisecondsForMinute * 60;
  let interval = null;
  const [timer, settimer] = useState({});
  const [disabled, setdisabled] = useState(false);

  function isExpired(time) {
    return time <= 0;
  }

  function addZero(number) {
    return number < 10 ? `0${number}` : number;
  }

  function convert(time) {
    const minutesRemaining = addZero(Math.floor((time % milisecondsForHour) / milisecondsForMinute));
    const secondsRemaining = addZero(Math.floor((time % milisecondsForMinute) / milisecondsForSecond));
    settimer({
      minutesRemaining,
      secondsRemaining,
    });
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
    interval = setInterval(() => {
      countDown(stopTime);
    }, milisecondsForSecond);
    countDown(stopTime);
  }, []);

  return (
    <div className='card'>
      <img src={img} alt='product' className='card__img' />
      <h3 className='card__title'>{title}</h3>
      <div className='card__actions'>
        <div>
          00:{timer.minutesRemaining}:{timer.secondsRemaining}
        </div>
        <button type='button' className='card__actions--detail' disabled={disabled}>
          Go to detail
        </button>
      </div>
    </div>
  );
};

Product.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default Product;

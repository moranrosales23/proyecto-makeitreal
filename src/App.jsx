import { React, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Product from './components/product/Product';
// import Modal from './components/modal/Modal';
// import DetailProduct from './components/detail-product/DetailProduct';

const App = function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      setProducts(response.data);
    });
  }, []);
  /* const data = {
    category: "men's clothing",
    description:
      'Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday',
    id: 1,
    image: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg',
    price: 109.95,
    rating: { rate: 3.9, count: 120 },
    title: 'Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops',
  }; */
  return (
    <>
      <hr />
      <h1 className='center'>
        <strong>Products</strong>
      </h1>
      {/* <Modal title='Information of Product'>
        <DetailProduct
          image={data.image}
          category={data.category}
          price={data.price}
          title={data.title}
          description={data.description}
          rating={data.rating}
        />
      </Modal> */}
      <div className='cards'>
        {products.map((product) => (
          <Product
            image={product.image}
            category={product.category}
            price={product.price}
            title={product.title}
            description={product.description}
            rating={product.rating}
            key={product.id}
          />
        ))}
      </div>
    </>
  );
};

export default App;

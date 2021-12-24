import { React, useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import Product from './components/product/Product';

const App = function App() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios.get('https://fakestoreapi.com/products').then((response) => {
      setProducts(response.data);
    });
  }, []);

  return (
    <>
      <hr />
      <h1 className='center'>
        <strong>Products</strong>
      </h1>
      <div className='cards'>
        {products.map((product) => (
          <Product img={product.image} title={product.title} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default App;

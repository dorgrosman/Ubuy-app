
import React, { useEffect } from 'react';
import Product from '../../cmps/Product/Product'
import MassageBox from './../../cmps/MassageBox/MassageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import './HomePage.scss'
import Hero from './../../cmps/Hero';


export default function HomePage() {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, []);

  return (
    <div >
      
       <Hero />

      {loading ? (
        null
        // <LoadingBox></LoadingBox>
      ) : error ? (
        <MassageBox variant="danger">{error}</MassageBox>
      ) : products ? (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>) : null
      }
    </div>
  );

}


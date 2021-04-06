
import React, { useEffect } from 'react';
import Product from '../../cmps/Product/Product'
import LoadingBox from './../../cmps/LoadingBox/LoadingBox';
import MassageBox from './../../cmps/MassageBox/MassageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import './HomePage.scss'
import SearchBox from './../../cmps/SearchBox/SearchBox';
import { Route } from 'react-router-dom';


export default function HomePage() {

  const dispatch = useDispatch();
  const productList = useSelector(state => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts({}));
  }, [dispatch]);

  return (
    <div>
      <section className="hero flex column align-center justify-center">
        <h1 className="hero-txt head">Buy More, Pay Less</h1>
        <h2 className="hero-txt small">Choose your garment, we'll provide the best product</h2>
      {/* <Route render={({ history }) => <SearchBox history={history}></SearchBox>} /> */}
  </section>
      {loading ? (
        <LoadingBox></LoadingBox>
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


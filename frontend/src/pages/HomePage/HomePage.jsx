
import React, { useEffect } from 'react';
import Product from '../../cmps/Product/Product'
import LoadingBox from './../../cmps/LoadingBox/LoadingBox';
import MassageBox from './../../cmps/MassageBox/MassageBox';
import { useDispatch, useSelector } from 'react-redux';
import { listProducts } from '../../actions/productActions';
import './HomePage.scss'


export default function HomePage() {

  const dispatch = useDispatch();
  const productList = useSelector( state => state.productList);
  const { loading, error, products } = productList;
 
  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // return (
  //   <div>

  //     {console.log('loading:', loading)}
  //     {console.log('products:', products)}

  //     {loading ? (<LoadingBox></LoadingBox>) : error ? (<MassageBox variant="danger" >{error}</MassageBox>) : (
  //      products ? ( <div className="row center">
  //         {products.map((product) => (
  //           // console.log('product:', product)
  //           <Product key={product._id} product={product} exact />
  //         ))}
  //       </div>
  //     )}
  //   </div>
  // )
  return (
    <div>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MassageBox variant="danger">{error}</MassageBox>
      ) : products ?(
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product}></Product>
          ))}
        </div>) : null 
      }
    </div>
  );
  
}


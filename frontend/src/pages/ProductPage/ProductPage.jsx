
import React, { useEffect, useState } from 'react'
import './ProductPage.scss'
import LoadingBox from './../../cmps/LoadingBox/LoadingBox';
import MassageBox from './../../cmps/MassageBox/MassageBox';
import Rating from '../../cmps/Rating/Rating'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import { detailsProduct, productUpdate } from '../../actions/productActions';

const ProductPage = (props) => {
  const dispatch = useDispatch();
  const productId = props.match.params.id;
  const [qty, setQty] = useState(1);
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails

  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId])

  const addToCartHandler = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`)
  }

  const toggleFavHendler = (event) => {
    event.preventDefault()
    console.log('product.isFav:', product.isFav)
    product.isFav = !product.isFav
    console.log('product.isFav:', product.isFav)


    dispatch(productUpdate({
      _id: product._id,
      name: product.name,
      price: product.price,
      img: product.img,
      category: product.category,
      countInStock: product.countInStock,
      brand: product.brand,
      description: product.description,
      isFav: product.isFav
    }))

  }


  return (
    <div>
      {loading ? (
        <LoadingBox />
      ) : error ? (
        <MassageBox variant="danger">{error}</MassageBox>
      ) : product ? (
        <div className="productDetails">

          {/* <div>
            <p className="toggle-fav" onClick={(event) => toggleFavHendler(event)}><i className={product.isFav ? "fas fa-heart" : "far fa-heart"}></i></p>
          </div> */}
          <div className="productDetails row top">
            <div className="col-2"><img src={product.img} className="large" alt="product" /></div>
            <div className="col-1  small-card-details">
              <ul className="clean">
                <li>
                  Seller{' '}
                  <h2>
                    <Link to={`/seller/${product.seller}`}>
                      {/* {product.seller.seller.name} */}
                    </Link>
                  </h2>
                  {/* <Rating
                    rating={product.seller.seller.rating}
                    numReviews={product.seller.seller.numReviews}
                  ></Rating> */}
                </li>
                <li><h1>{product.name}</h1></li>
                <li><Rating rating={product.rating} numReviews={product.numReviews} /></li>
                <li>Price : {product.price} $</li>
                <li>Description: <p>{product.description}</p></li>
                <div>
                  <img
                    src={product.img}
                    alt={product.name}
                    className="small"
                  ></img>
                </div>
              </ul >
            </div>
            <div className="col-1">
              <div className="card card-body">
                <ul className="clean">
                  <li><div className="row"><div>Price :</div><div className="price "> {product.price} $ </div></div></li>
                  <li><div className="row"><div>Status :</div> {product.countInStock > 0 ? (<span className="success">In Stock</span>) : (<span className="danger" >Unavailable</span>)}</div></li>
                  {
                    product.countInStock > 0 && (<>
                      <li>
                        <div className="row">
                          <div>Qty</div>
                          <div>
                            <select value={qty} onChange={el => setQty(el.target.value)} >
                              {
                                [...Array(product.countInStock).keys()].map(item => (
                                  <option key={item + 1} value={item + 1}>{item + 1}</option>
                                ))
                              }
                            </select>
                          </div>
                        </div>
                      </li>
                      <li><button onClick={addToCartHandler} className="primary block " >Add to Cart</button></li>
                      <div className="Back-to-result" >
                        <Link to='/home'><i class="fas fa-arrow-left"></i>  Back to result</Link>
                      </div>
                    </>
                    )
                  }
                </ul>
              </div>

            </div>
          </div>
        </div>
      ) : null}
    </div>

  )
}

export default ProductPage


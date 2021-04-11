
import React, { useState, useEffect } from 'react'
import Rating from '../Rating/Rating'

import './Product.scss'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { productUpdate } from '../../actions/productActions';
import { listProducts } from './../../actions/productActions';


const Product = (props) => {
    const { product } = props
    
    // console.log('product:', product)
    // const productFavUpdates =useSelector(state => console.log('state.updateProduct.product:', state.updateProduct.product))
    // const productFavUpdates1 =useSelector(state => console.log('state.updateProduct.product:', state.updateProduct))
    // console.log('productFavUpdates:', productFavUpdates)
    // const productFavUpdate =useSelector(state => state.updateProduct.product.product)
    const productFavUpdate =useSelector(state => state.updateProduct.product.product)
    // const productFavUpdate1 =useSelector(state => state.updateProduct.product)
    
    // console.log('productFavUpdate:', productFavUpdate1)

    const [isFav, setIsFav] = useState('')
    const dispatch = useDispatch();
    const productDetails = useSelector(state => state.productDetails)
    // console.log('productDetails:', productDetails)
    // const { loading, error, product } = productDetails
    // console.log('product:', product)

    useEffect(() => {
        setIsFav(product.isFav)
      
    }, [product, dispatch])

    const toggleFavHendler = (event) => {
        event.preventDefault()
        // console.log(' product.isFav:',  product.isFav)
        // product._id
        // console.log('product._id:', product._id)
        product.isFav = !product.isFav
        // console.log('product.isFav:', product.isFav)
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
        <div key={product._id} className="card" >
            <div className="card-body">
                <Link to={`/product/${product._id}`} ><img className="medium" src={product.img} alt="product" /></Link>
                <div>
                    <p className="toggle-fav" onClick={(event) => toggleFavHendler(event)}><i className={productFavUpdate?.isFav ? "fas fa-heart" : "far fa-heart"}></i></p>
                </div>
                <Link to={`/product/${product._id}`}><p className="title" to={`/product/${product._id}`} >{product.name}</p><Link to={`/product/${product._id}`}><p className="desc" to={`/product/${product._id}`} >{product.description}</p></Link></Link>
                <p className="pre-price row">Price : <p className="price"> {product.price} $</p></p>
                {/* <Rating
                    rating={product.rating}
                    numReviews={product.numReviews} /> */}
                {/* <div className="row">
                    <div>
                    </div>
                </div> */}

            </div >
        </div >
    )

}


export default Product
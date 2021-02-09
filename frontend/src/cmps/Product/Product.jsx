
import React from 'react'
import Rating from '../Rating/Rating'
import './Product.scss'
import { Link } from 'react-router-dom';

const Product = (props) => {
    const { product } = props

    return (
        <div key={product._id} className="card">
            <Link to={`/product/${product._id}`} ><img className="medium" src={product.img} alt="product" /></Link>
            <div className="card-body">
           
                <Link to={`/product/${product._id}`}><h3 to={`/product/${product._id}`} >{product.name}</h3></Link>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews} />
                <div className="price" >{product.price} $</div>
               
            </div>
        </div>
    )

}


export default Product
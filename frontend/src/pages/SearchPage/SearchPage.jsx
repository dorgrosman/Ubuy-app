import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { listProducts } from './../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import LoadingBox from './../../cmps/LoadingBox/LoadingBox';
import MassageBox from './../../cmps/MassageBox/MassageBox';
import Product from './../../cmps/Product/Product';

export default function SearchPage(props) {
    const { name = 'all' } = useParams();
    const dispatch = useDispatch();
    const productList = useSelector(state => state.productList);
    const { error, loading, products } = productList
    useEffect(() => {
        // dispatch(listProducts({ name: name !== 'all' ? name : '' }))

    }, [dispatch, name])

    return (
        <div>
            <div className="row">

                {loading ? <LoadingBox></LoadingBox> :
                    error ? <MassageBox variant="danger">{error}</MassageBox> :
                        <div>
                            {products.length} Results
                </div>}
                <div className="row top">
                    <div className="col-1">
                        <h3>Department</h3>
                        <ul>
                            <li>Category 1</li>
                        </ul>
                    </div>
                    <div className="col-3">
                        {loading ? <LoadingBox></LoadingBox> :
                        error ? <MassageBox variant="danger">{error}</MassageBox> :
                        products ? (
                            <div className="row center">
                              {products.map((product) => (
                                <Product key={product._id} product={product}></Product>
                              ))}
                            </div>) : null
                          }
                        
                    </div>
                </div>
            </div>
        </div>
    )
}


import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import MassageBox from './../../cmps/MassageBox/MassageBox';
import LoadingBox from './../../cmps/LoadingBox/LoadingBox';
import { listProducts, createProduct, deleteProduct } from '../../actions/productActions';
import { PRODUCT_CREATE_RESET ,PRODUCT_DELETE_RESET } from './../../constants/productConstants';

const ProductListPage = (props) => {
    const sellerMode = props.match.path.indexOf('/seller') >= 0;
    console.log('sellerMode:', sellerMode)
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList;
    const productCreate = useSelector(state => state.productCreate)
    const {
        loading: loadingCreate,
        success: successCreate,
        error: errorCreate,
        product: createdProduct,
    } = productCreate

    const productDelete = useSelector(state => state.productDelete)
    const {
        loading: loadingDelete,
        success: successDelete,
        error: errorDelete,
    } = productDelete
    const userSignin = useSelector((state) => state.userSignin);
    const { userInfo } = userSignin;
    const dispatch = useDispatch();

    useEffect(() => {
        if (successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET });
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        
        if(successDelete){
            dispatch({type:PRODUCT_DELETE_RESET})
        }
        dispatch(listProducts({ seller: sellerMode ? userInfo._id : '' }));
    }, [
      createdProduct,
      dispatch,
      props.history,
      sellerMode,
      successCreate,
      successDelete,
      userInfo._id,
    ]);


    const deleteHendler = (product) => {
        if (window.confirm('Are you sure to delete?')) {
        dispatch(deleteProduct(product._id))
        }
    }

    const createHendler = () => {
        dispatch(createProduct())
    }

    return (
        <div>
            <div className="row">
                <h1>Products</h1>
                <button type="button" className="primary" onClick={createHendler}>Create Product</button>
            </div>
            {loadingDelete && <LoadingBox></LoadingBox>}
            {errorDelete && <MassageBox variant="danger">{errorDelete}</MassageBox>}

            {loadingCreate && <LoadingBox></LoadingBox>}
            {errorCreate && <MassageBox variant="danger">{errorCreate}</MassageBox>}
            {loading ? (
                <LoadingBox></LoadingBox>
            ) : error ? (
                <MassageBox variant="danger">{error}</MassageBox>
            ) : (
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Brand</th>
                                    <th>Img</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map(product => (

                                    <tr key={product._id}>
                                        <td>{product._id}</td>
                                        <td>{product.name}</td>
                                        <td>{product.price}</td>
                                        <td>{product.category}</td>
                                        
                                        <td>{product.brand}</td>
                                        <td><img src={product.img} className="small" alt="" /></td>
                                        <td >
                                            <div className="space-btn">
                                            <button type="button" className="small"
                                                onClick={() => props.history.push(`/product/${product._id}/edit`)}>
                                                Edit
                                            </button>
                                            <button className="small" type="button" onClick={() => deleteHendler(product)}>Delete</button>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                )}
                            </tbody>
                        </table>

                    )}
        </div>)
}

export default ProductListPage

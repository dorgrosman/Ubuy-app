import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import LoadingBox from '../../cmps/LoadingBox/LoadingBox';
import MassageBox from '../../cmps/MassageBox/MassageBox';
import {listOrderMine} from '../../actions/OrderActions';

const OrderHistoryPage = (props) => {
    const mineList = useSelector((state) => state.mineList)
    const { loading, error, orders } = mineList
    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(listOrderMine())
    },[dispatch])
    return (
        <div>
          <h1>Order History</h1>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MassageBox variant="danger">{error}</MassageBox>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.totalPrice.toFixed(2)}</td>
                    <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                    <td>
                      { 'No'}
                    </td>
                    <td>
                      <button
                        type="button"
                        className="small"
                        onClick={() => {
                          props.history.push(`/order/${order._id}`);
                        }}
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      );
}


export default OrderHistoryPage
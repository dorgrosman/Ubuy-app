import React, { useState } from 'react'
import CheckoutSteps from '../../cmps/CheckoutSteps'
import { useDispatch, useSelector } from 'react-redux';
import { savePaymenMethod } from '../../actions/CartActions';

const PaymentMethodPage = (props) => {
    const cart = useSelector((state) => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        props.history.push('/shipping');
    }
    const [paymentMethod, setPaymentMethod] = useState('PayPal')
    const dispatch = useDispatch('');


    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(savePaymenMethod(paymentMethod))
        props.history.push('/placeorder')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3></CheckoutSteps>
            <form className="form" onSubmit={submitHandler}>
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input type="radio"
                            id="paypal"
                            name="paymentMethod"
                            value="PayPal"
                            onChange={(event) => setPaymentMethod(event.target.value)}
                            required
                            checked
                        />
                        <label htmlFor="paypal">PayPal</label>
                    </div>
                </div>
                <div>
                    <div>
                        <input type="radio"
                            id="stripe"
                            name="paymentMethod"
                            value="strip"
                            onChange={(event) => setPaymentMethod(event.target.value)}
                            required
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <div className="multi-button">
                        <button className="primary" type="submit">Continue</button>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default PaymentMethodPage

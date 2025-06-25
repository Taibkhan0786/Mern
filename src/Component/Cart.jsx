import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { getCart, updateCart, deleteCart } from "../Store/ActionCreators/CartActionCreators"
import { useDispatch, useSelector } from 'react-redux';
export default function Cart() {
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)

    let dispatch = useDispatch()

    let allCartStateData = useSelector((state) => state.CartStateData)
    function updateItem(_id, op) {
        var item = cart.find((item) => item._id === _id)
        if (op === "DEC" && item.qty === 1)
            return
        else if (op === "DEC") {
            item.qty = item.qty - 1
            item.total = item.total - item.price
        }
        else {
            item.qty = item.qty + 1
            item.total = item.total + item.price
        }
        dispatch(updateCart(item))
        getAPIData()
    }
    function deleteItem(_id) {
        dispatch(deleteCart({ _id: _id }))
        getAPIData()
    }
    function getAPIData() {
        dispatch(getCart())
        if (allCartStateData.length) {
            var items = allCartStateData
            setCart(items)
            let subtotal = 0
            let shipping = 0
            let total = 0
            for (let item of items) {
                subtotal = subtotal + item.total
            }
            if (subtotal > 0 && subtotal < 1000)
                shipping = 150

            total = subtotal + shipping
            setSubtotal(subtotal)
            setShipping(shipping)
            setTotal(total)
        }
    }
    useEffect(() => {
        getAPIData()
    }, [allCartStateData.length])
    return (
        <>
            {/* <!-- Breadcrumb Begin --> */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                <span>Shopping cart</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcrumb End --> */}

            {/* <!-- Shop Cart Section Begin --> */}
            <section className="shop-cart spad">
                {
                    cart.length?
                    <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="shop__cart__table">
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <th></th>
                                            <th className='text-center'>Name</th>
                                            <th className='text-center'>Brand/Color/Size</th>
                                            <th className='text-center'>Price</th>
                                            <th className='text-center'></th>
                                            <th className='text-center'>Quantity</th>
                                            <th className='text-center'></th>
                                            <th className='text-center'>Total</th>
                                            <th className='text-center'></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            cart.map((item, index) => {
                                                return <tr key={index}>
                                                    <td className="cart__product__item">
                                                        <a href={`/public/uploads/products/${item.pic}`} target='_blank' rel='noerror'>
                                                            <img src={`/public/uploads/products/${item.pic}`} height="80px" width="80px" className='rounded' alt="" />
                                                        </a>
                                                    </td>
                                                    <td className="cart__price text-center">{item.name}</td>
                                                    <td className="cart__price text-center">{item.brand}/{item.color}/{item.size}</td>
                                                    <td className="cart__price text-center">&#8377;{item.price}</td>
                                                    <td className="cart__price text-center"><button className='btn btn-danger btn-sm' onClick={() => updateItem(item._id, "DEC")}><i className='fa fa-minus'></i></button></td>
                                                    <td className="cart__price text-center">{item.qty}</td>
                                                    <td className="cart__price text-center"><button className='btn btn-danger btn-sm' onClick={() => updateItem(item._id, "INC")}><i className='fa fa-plus'></i></button></td>
                                                    <td className="cart__total">&#8377;{item.total}</td>
                                                    <td className="cart__price text-center"><button className='btn btn-danger btn-sm' onClick={() => deleteItem(item._id)}><i className='fa fa-trash'></i></button></td>
                                                </tr>
                                            })
                                        }

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-6">
                        </div>
                        <div className="col-lg-4 offset-lg-2">
                            <div className="cart__total__procced">
                                <h6 className="text-center">Cart total</h6>
                                <ul>
                                    <li>Subtotal <span>&#8377;{subtotal}</span></li>
                                    <li>Shipping <span>&#8377;{shipping}</span></li>
                                    <li>Total <span>&#8377;{total}</span></li>
                                </ul>
                                <Link to="/checkout" className="primary-btn">Proceed to checkout</Link>
                            </div>
                        </div>
                    </div>
                </div>:
                <div className='text-center'>
                    <p>Your Cart is Empty!!!</p>
                    <Link to="/shop/All/All/All/" className='btn btn-primary'>Shop</Link>
                </div>
                }
            </section>
            {/* <!-- Shop Cart Section End -->   */}
        </>
    );
}
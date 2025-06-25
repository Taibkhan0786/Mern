import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { deleteWishlist, getWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { getCheckoutUser } from "../Store/ActionCreators/CheckoutActionCreators"
import { useDispatch, useSelector } from 'react-redux'
export default function Profile() {
    let [user, setUser] = useState({
        pic: ""
    })
    let navigate = useNavigate()
    let [wishlist, setWishlist] = useState([])
    let [checkout, setCheckout] = useState([])

    let allWishlistStateData = useSelector((state) => state.WishlistStateData)
    let allCheckoutStateData = useSelector((state) => state.CheckoutStateData)
    let dispatch = useDispatch()
    function deleteItem(_id) {
        dispatch(deleteWishlist({ _id: _id }))
        getAPIData()
    }
    async function getAPIData() {
        dispatch(getWishlist())
        dispatch(getCheckoutUser())
        if (allWishlistStateData.length) {
            setWishlist(allWishlistStateData)
        }
        if (allCheckoutStateData.length) {
            setCheckout(allCheckoutStateData.filter((x) => x.userid === localStorage.getItem("userid")))
        }
        var response = await fetch("/api/user/"+localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json",
                "authorization":localStorage.getItem("token")
            }
        })
        response = await response.json()
        if (response.result==="Done")
            setUser(response.data)
        else
        alert(response.message)
    }
    useEffect(() => {
        getAPIData()
    }, [allWishlistStateData.length, allCheckoutStateData.length])
    return (
        <div className='container-fluid'>
            <div className="row">
                <div className="col-md-6 mt-3">
                    {
                        user.pic ?
                            <img src={`/public/uploads/users/${user.pic}`} height="500px" width="100%" alt="" /> :
                            <img src={`/images/noimage.png`} height="500px" width="100%" alt="" />
                    }
                </div>
                <div className="col-md-6">
                    <h5 className='bg-secondary text-light p-2 text-center mt-3'>Buyer Profle</h5>
                    <table className='table table-bordered'>
                        <tbody>
                            <tr>
                                <th>Name</th>
                                <td>{user.name}</td>
                            </tr>
                            <tr>
                                <th>User Name</th>
                                <td>{user.username}</td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>{user.email}</td>
                            </tr>
                            <tr>
                                <th>Phone</th>
                                <td>{user.phone}</td>
                            </tr>
                            <tr>
                                <th>Address</th>
                                <td>{user.address}</td>
                            </tr>
                            <tr>
                                <th>Pin</th>
                                <td>{user.pin}</td>
                            </tr>
                            <tr>
                                <th>City</th>
                                <td>{user.city}</td>
                            </tr>
                            <tr>
                                <th>State</th>
                                <td>{user.state}</td>
                            </tr>
                            <tr>
                                <th></th>
                                <td colSpan={2} className=''><Link to="/update-profile" className='text-light btn btn-secondary w-100 btn-sm'>Update Profile</Link></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            {
                wishlist.length ?
                    <>
                        <div className="my-3 card p-5">
                            <h5 className='text-center p-4'>Wishlist Section</h5>
                            <div className="table-responsive">
                                <table className='table'>
                                    <tbody>
                                        <tr>
                                            <th></th>
                                            <th>Name</th>
                                            <th>Brand/Color/Size</th>
                                            <th>Price</th>
                                            <th></th>
                                            <th></th>
                                        </tr>
                                        {
                                            wishlist.map((item, index) => {
                                                return <tr key={index}>
                                                    <td><a href={`/public/uploads/products/${item.pic}`} target='_blank' rel='noerror'>
                                                        <img src={`/public/uploads/products/${item.pic}`} alt="" height="80px" width="80px" className='rounded' /></a></td>
                                                    <td>{item.name}</td>
                                                    <td>{item.brand}/{item.color}/{item.size}</td>
                                                    <td>&#8377;{item.price}</td>
                                                    <td><Link to={`/single-product/${item.productid}`}><i className='fa fa-shopping-cart text-secondary'></i></Link></td>
                                                    <td><button className='btn' onClick={() => deleteItem(item._id)}><i className='fa fa-trash text-secondary'></i></button></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                    :
                    <div className="my-3 card p-5 text-center">
                        <p>No Items in Wishlist</p>
                    </div>
            }
            {
                checkout.length ?
                    <>
                        <h5 className='text-center my-4'>Order History Section</h5>
                        {
                            checkout.map((item, index) => {
                                return <div className='row mb-3' key={index}>
                                    <div className="col-md-4 cart__total__procced">
                                        <div className="table-responsive">
                                            <table className='table'>
                                                <thead>
                                                    <tr>
                                                        <th>Order Id</th>
                                                        <td>{item.id}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Mode</th>
                                                        <td>{item.paymentmode}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Payment Status</th>
                                                        <td>{item.paymentstatus}
                                                            <br/>
                                                            {
                                                                item.paymentstatus==="Pending" && item.paymentmode!=="COD"?
                                                                <Link to={"/payment/"+item._id} className='btn btn-primary'>Pay Now</Link>:""
                                                            }
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <th>Order Status</th>
                                                        <td>{item.orderstatus}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Subtotal</th>
                                                        <td>&#8377;{item.subtotal}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Shipping</th>
                                                        <td>&#8377;{item.shipping}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Total</th>
                                                        <td>&#8377;{item.total}</td>
                                                    </tr>
                                                    <tr>
                                                        <th>Date</th>
                                                        <td>{item.date}</td>
                                                    </tr>
                                                </thead>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="table-responsive">
                                            <table className='table'>
                                                <tbody>
                                                    <tr>
                                                        <th></th>
                                                        <th>Name</th>
                                                        <th>Brand/Color/Size</th>
                                                        <th>Price</th>
                                                        <th>Qty</th>
                                                        <th>Total</th>
                                                    </tr>
                                                    {
                                                        item.products.map((item, index) => {
                                                            return <tr key={index}>
                                                                <td><a href={`/public/uploads/products/${item.pic}`} target='_blank' rel='noerror'>
                                                                    <img src={`/public/uploads/products/${item.pic}`} alt="" height="80px" width="80px" className='rounded' /></a></td>
                                                                <td>{item.name}</td>
                                                                <td>{item.brand}/{item.color}/{item.size}</td>
                                                                <td>&#8377;{item.price}</td>
                                                                <td>{item.qty}</td>
                                                                <td>&#8377;{item.total}</td>
                                                            </tr>
                                                        })
                                                    }
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </> :
                    <div className="my-3 card p-5 text-center">
                        <p>No Order History Found!!!</p>
                    </div>
            }
        </div>
    )
}

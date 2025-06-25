import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { useDispatch, useSelector } from 'react-redux'
import { deleteCart, getCart } from "../Store/ActionCreators/CartActionCreators"
export default function Checkout(props) {
    let [user, setUser] = useState({
        pic: ""
    })
    let [mode,setMode] = useState("COD")
    let [cart, setCart] = useState([])
    let [subtotal, setSubtotal] = useState(0)
    let [shipping, setShipping] = useState(0)
    let [total, setTotal] = useState(0)
    let navigate = useNavigate()

    let allCartStateData = useSelector((state) => state.CartStateData)
    let dispatch = useDispatch()
    async function placeOrder(){
        var date = new Date()
        var item = {
            userid:localStorage.getItem("userid"),
            paymentmode:mode,
            paymentstatus:"Pending",
            orderstatus:"Order is Placed",
            subtotal:subtotal,
            shipping:shipping,
            total:total,
            date:date.toLocaleDateString(),
            products:cart
        }
        var response = await fetch("/api/checkout",{
            method:"post",
            headers:{
                "content-type":"application/json",
                "authorization":localStorage.getItem("token")
            },
            body:JSON.stringify(item)
        })
        response = await response.json()
        for(let item of cart){
            dispatch(deleteCart({_id:item._id}))
        }
        if (mode === "COD")
			navigate("/confirmation")
		else
			navigate("/payment/"+response.data._id)

    }
    async function getAPIData() {
        var response = await fetch("/api/user/"+localStorage.getItem("userid"), {
            method: "get",
            headers: {
                "content-type": "application/json",
                "authorization":localStorage.getItem("token")
            }
        })
        response = await response.json()
        if (response.data)
            setUser(response.data)

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
                                <span>Checkout</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcrumb End --> */}

            {/* <!-- Checkout Section Begin --> */}
            <section className="checkout ">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <h5 className='text-center p-2'>Billing detail</h5>
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
                        <div className="col-md-6">
                            <div className="checkout__order">
                                <h5>Your order</h5>
                                <div className="checkout__order__product">
                                    <ul>
                                        <li>
                                            <span className="top__text">Product</span>
                                            <span className="top__text__right">Total</span>
                                        </li>
                                        
                                        {
                                            cart.map((item,index)=>{
                                                return <li key={index}>{index+1}. {item.name} (&#8377;{item.price} X {item.qty})<span>&#8377; {item.total}</span></li>
                                            })
                                        }
                                        
                                    </ul>
                                </div>
                                <div className="checkout__order__total">
                                    <ul>
                                        <li>Subtotal <span>&#8377; {subtotal}</span></li>
                                        <li>Shipping <span>&#8377; {shipping}</span></li>
                                        <li>Total <span>&#8377; {total}</span></li>
                                    </ul>
                                </div>
                                <div className="checkout__order__widget">
                                    <label>Payment Mode</label>
                                    <select name="mode"  className='form-control' onChange={(e)=>setMode(e.target.value)}>
                                        <option value="COD">COD</option>
                                        <option value="NetBanking">NetBanking/Card/UPI</option>
                                    </select>
                                </div>
                                <button type="submit" className="site-btn" onClick={placeOrder}>Place oder</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section >
            {/* <!-- Checkout Section End --> */}

        </>
    );
}
import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import {  useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout, updateCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"

export default function AdminSingleCheckout() {
    var [data, setData] = useState({})
    var [user, setUser] = useState({})
    var [paymentstatus, setPaymentStatus] = useState("")
    var [orderstatus, setIOrderStatus] = useState("")

    var { _id } = useParams()
    var stateData = useSelector((state) => state.CheckoutStateData)
    var disptach = useDispatch()
    async function getAPIData() {
        disptach(getCheckout())
        if (stateData.length) {
            var item = stateData.find((x) => x._id === _id)
            if (item) {
                setData(item)
                setIOrderStatus(item.orderstatus)
                setPaymentStatus(item.paymentstatus)
            }

            var response = await fetch("/api/user/" + item.userid, {
                method: "get",
                headers: {
                    "content-type": "application/json",
                    "authorization":localStorage.getItem("token")
                }
            })
            response = await response.json()
            if(response.result==="Done")
            setUser(response.data)
        }
    }
    function updateItem() {
        disptach(updateCheckout({ ...data, orderstatus: orderstatus, paymentstatus: paymentstatus }))
        setData({ ...data, orderstatus: orderstatus, paymentstatus: paymentstatus })
    }
    useEffect(() => {
        getAPIData()
    }, [stateData.length])
    return (
        <div className='container-fluid my-3'>
            <div className="row">
                <div className="col-md-2">
                    <SideBar />
                </div>
                <div className="col-md-10">
                    <h5 className='bg-primary p-2 text-light rounded text-center'>Checkout</h5>
                    <div className="table-responsive">
                        <table className='table table-bordered'>
                            <tbody>
                                <tr>
                                    <th>Id</th>
                                    <td>{data._id}</td>
                                </tr>
                                <tr>
                                    <th>User</th>
                                    <td>
                                        <address>
                                            {user.name}<br />
                                            {user.email}/{user.phone}<br />
                                            {user.address}<br />
                                            {user.pin}, {user.city} , {user.state}
                                        </address>
                                    </td>
                                </tr>
                                <tr>
                                    <th>Order Status</th>
                                    <td>{data.orderstatus}
                                        {
                                            data.orderstatus !== "Delivered" ?
                                                <>
                                                    <br />
                                                    <select name="orderstatus" value={orderstatus} onChange={(e) => setIOrderStatus(e.target.value)} className='form-control'>
                                                        <option value="Order is Placed">Order is Placed</option>
                                                        <option value="Order is Packed">Order is Packed</option>
                                                        <option value="Ready to Dispatch">Ready to Dispatch</option>
                                                        <option value="Dispatched">Dispatched</option>
                                                        <option value="Out For Delivery">Out For Delivery</option>
                                                        <option value="Delivered">Delivered</option>
                                                    </select>
                                                </> : ""
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <th>Payment Status</th>
                                    <td>{data.paymentstatus}
                                        {
                                            data.paymentstatus === "Pending" ?
                                                <>
                                                    <br />
                                                    <select name="paymentstatus" value={paymentstatus} onChange={(e) => setPaymentStatus(e.target.value)} className='form-control'>
                                                        <option value="Pending">Pending</option>
                                                        <option value="Done">Done</option>
                                                    </select>
                                                </> : ""
                                        }

                                    </td>
                                </tr>
                                <tr>
                                    <th>Payment Mode</th>
                                    <td>{data.paymentmode}</td>
                                </tr>
                                <tr>
                                    <th>Subtotal</th>
                                    <td>&#8377;{data.subtotal}</td>
                                </tr>
                                <tr>
                                    <th>Shipping</th>
                                    <td>&#8377;{data.shipping}</td>
                                </tr>
                                <tr>
                                    <th>Total</th>
                                    <td>&#8377;{data.total}</td>
                                </tr>
                                <tr>
                                    <th>Date</th>
                                    <td>{data.date}</td>
                                </tr>
                                {
                                    data.orderstatus !== "Delivered" || data.paymentstatus === "Pending" ?
                                        <tr>
                                            <th colSpan={2}><button className='btn btn-danger' onClick={updateItem}>Update</button></th>
                                        </tr> : ""
                                }
                            </tbody>
                        </table>
                    </div>

                    <h5 className='bg-primary p-2 text-center text-light'>Checkout products</h5>
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
                                    data.products && data.products.map((item, index) => {
                                        return <tr key={index}>
                                            <td><a href={`/public/uploads/products/${item.pic}`} target='_blank'  rel="noreferrer">
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
        </div>
    )
}

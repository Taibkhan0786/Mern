import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { getCheckout } from "../../../Store/ActionCreators/CheckoutActionCreators"

export default function AdminCheckout() {
  var [data, setData] = useState([])
  var stateData = useSelector((state) => state.CheckoutStateData)
  var disptach = useDispatch()
  function getAPIData() {
    disptach(getCheckout())
    if (stateData.length) {
      setData(stateData)
    }
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
                  <th>ID</th>
                  <th>Order Status</th>
                  <th>Payment Mode</th>
                  <th>Payment Status</th>
                  <th>Subtotal</th>
                  <th>Shipping</th>
                  <th>Total</th>
                  <th>Date</th>
                  <th></th>
                </tr>
                {
                  data.map((item, index) => {
                    return <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.orderstatus}</td>
                      <td>{item.paymentmode}</td>
                      <td>{item.paymentstatus}</td>
                      <td>&#8377;{item.subtotal}</td>
                      <td>&#8377;{item.shipping}</td>
                      <td>&#8377;{item.total}</td>
                      <td>{item.date}</td>
                      <td><Link to={`/admin-single-checkout/${item._id}`}><i className='fa fa-eye'></i></Link></td>
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

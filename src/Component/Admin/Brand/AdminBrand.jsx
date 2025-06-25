import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"

export default function AdminBrand() {
  var [data, setData] = useState([])
  var stateData = useSelector((state) => state.BrandStateData)
  var disptach = useDispatch()
  function getAPIData() {
    disptach(getBrand())
    if (stateData.length) {
      setData(stateData)
    }
  }
  function deleteItem(_id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      disptach(deleteBrand({ _id: _id }))
      getAPIData()
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
          <h5 className='bg-primary p-2 text-light rounded text-center'>Brand <Link to="/admin-add-Brand" className='fa fa-plus text-light float-right'></Link></h5>
          <div className="table-responsive">
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th></th>
                  <th></th>
                </tr>
                {
                  data.map((item, index) => {
                    return <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td><Link to={"/admin-update-brand/" + item._id}><i className='fa fa-edit' title='Edit'></i></Link></td>
                      <td><button className='btn text-primary' onClick={() => deleteItem(item._id)}><i className='fa fa-trash' title='Delete'></i></button></td>
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

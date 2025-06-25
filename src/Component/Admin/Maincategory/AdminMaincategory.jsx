import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteMaincategory, getMaincategory } from "../../../Store/ActionCreators/MaincategoryActionCreators"

export default function AdminMaincategory() {
  var [data, setData] = useState([])
  var stateData = useSelector((state) => state.MaincategoryStateData)
  var disptach = useDispatch()
  function getAPIData() {
    disptach(getMaincategory())
    if (stateData.length) {
      setData(stateData)
    }
  }
  function deleteItem(_id){
    if(window.confirm("Are You Sure to Delete that Item : ")){
      disptach(deleteMaincategory({_id:_id}))
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
          <h5 className='bg-primary p-2 text-light rounded text-center'>Maincategory <Link to="/admin-add-maincategory" className='fa fa-plus text-light float-right'></Link></h5>
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
                      <td><Link to={"/admin-update-maincategory/"+item._id}><i className='fa fa-edit' title='Edit'></i></Link></td>
                      <td><button className='btn text-primary' onClick={()=>deleteItem(item._id)}><i className='fa fa-trash' title='Delete'></i></button></td>
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

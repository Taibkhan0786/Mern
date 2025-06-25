import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { useDispatch, useSelector } from 'react-redux'

import { deleteNewslatter, getNewslatter } from "../../../Store/ActionCreators/NewslatterActionCreators"

export default function AdminNewslatter() {
  var [data, setData] = useState([])
  var stateData = useSelector((state) => state.NewslatterStateData)
  var disptach = useDispatch()
  function getAPIData() {
    disptach(getNewslatter())
    if (stateData.length) {
      setData(stateData)
    }
  }
  function deleteItem(_id){
    if(window.confirm("Are You Sure to Delete that Item : ")){
      disptach(deleteNewslatter({_id:_id}))
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
          <h5 className='bg-primary p-2 text-light rounded text-center'>Newslatter</h5>
          <div className="table-responsive">
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th></th>
                </tr>
                {
                  data.map((item, index) => {
                    return <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.email}</td>
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

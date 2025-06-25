import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { deleteContact, getContact } from "../../../Store/ActionCreators/ContactActionCreators"

export default function AdminContact() {
  var [data, setData] = useState([])
  var stateData = useSelector((state) => state.ContactStateData)
  var disptach = useDispatch()
  function getAPIData() {
    disptach(getContact())
    if (stateData.length) {
      setData(stateData)
    }
  }
  function deleteItem(_id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      disptach(deleteContact({ _id: _id }))
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
          <h5 className='bg-primary p-2 text-light rounded text-center'>Contact</h5>
          <div className="table-responsive">
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                  <th></th>
                </tr>
                {
                  data.map((item, index) => {
                    return <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.subject.slice(0, 50) + "..."}</td>
                      <td>{item.status}</td>
                      <td>{item.date}</td>
                      <td><Link to={`/admin-single-contact/${item._id}`}><i className='fa fa-eye'></i></Link></td>
                      <td>
                        {
                          item.status === "Done" ?
                            <button className='btn text-primary' onClick={() => deleteItem(item._id)}><i className='fa fa-trash' title='Delete'></i></button> : ""
                        }
                      </td>
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

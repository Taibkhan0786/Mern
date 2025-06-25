import React, { useEffect, useState } from 'react'
import SideBar from '../SideBar'
import { Link } from 'react-router-dom'


export default function AdminUser() {
  var [data, setData] = useState([])
  async function getAPIData() {
    var response = await fetch("/api/user/", {
      method: "get",
      headers: {
        "content-type": "application/json",
        "authorization":localStorage.getItem("token")
      }
    })
    response = await response.json()
    setData(response.data)
  }
  async function deleteItem(_id) {
    if (window.confirm("Are You Sure to Delete that Item : ")) {
      var response = await fetch("/api/user/" + _id, {
        method: "delete",
        headers: {
          "content-type": "application/json",
          "authorization":localStorage.getItem("token")
        }
      })
      response = await response.json()
      getAPIData()
    }
  }
  useEffect(() => {
    getAPIData()
  }, [data.length])
  return (
    <div className='container-fluid my-3'>
      <div className="row">
        <div className="col-md-2">
          <SideBar />
        </div>
        <div className="col-md-10">
          <h5 className='bg-primary p-2 text-light rounded text-center'>Users</h5>
          <div className="table-responsive">
            <table className='table table-bordered'>
              <tbody>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Role</th>
                  <th></th>
                </tr>
                {
                  data.map((item, index) => {
                    return <tr key={index}>
                      <td>{item._id}</td>
                      <td>{item.name}</td>
                      <td>{item.username}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.role}</td>
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

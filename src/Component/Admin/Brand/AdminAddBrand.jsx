import React, { useEffect, useRef } from 'react'
import SideBar from '../SideBar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { createBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
export default function AdminAddBrand() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let name = useRef("")
  let allStateData = useSelector((state) => state.BrandStateData)
  function getInputData(e) {
    name.current = e.target.value
  }
  function postData(e) {
    e.preventDefault()
    let item = allStateData.find((item) => item.name == name.current)
    if (item)
      alert("Brand Already Exist!!!")
    else {
      dispatch(createBrand({ name: name.current }))
      navigate("/admin-brand")
    }
  }
  function getAPIData() {
    dispatch(getBrand())
  }
  useEffect(() => {
    getAPIData()
  }, [allStateData.length])
  return (
    <div className='container-fluid my-3'>
      <div className="row">
        <div className="col-md-2">
          <SideBar />
        </div>
        <div className="col-md-10">
          <h5 className='bg-primary p-2 mb-2 text-light rounded text-center'>Brand</h5>
          <form onSubmit={postData}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" onChange={getInputData} placeholder='Enter Brand Name ' className='form-control' />
            </div>
            <div className="mb-3 btn-group w-100">
              <button type="reset" className='btn btn-secondary w-50'>Reset</button>
              <button type="submit" className='btn btn-primary w-50'>Submit</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

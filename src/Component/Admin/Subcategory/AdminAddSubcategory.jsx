import React, { useEffect, useRef } from 'react'
import SideBar from '../SideBar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { createSubcategory, getSubcategory } from "../../../Store/ActionCreators/SubcategoryActionCreators"
export default function AdminAddSubcategory() {
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let name = useRef("")
  let allStateData = useSelector((state) => state.SubcategoryStateData)
  function getInputData(e) {
    name.current = e.target.value
  }
  function postData(e) {
    e.preventDefault()
    let item = allStateData.find((item) => item.name == name.current)
    if (item)
      alert("Subcategory Already Exist!!!")
    else {
      dispatch(createSubcategory({ name: name.current }))
      navigate("/admin-subcategory")
    }
  }
  function getAPIData() {
    dispatch(getSubcategory())
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
          <h5 className='bg-primary p-2 mb-2 text-light rounded text-center'>Subcategory</h5>
          <form onSubmit={postData}>
            <div className="mb-3">
              <label>Name</label>
              <input type="text" name="name" onChange={getInputData} placeholder='Enter Subcategory Name ' className='form-control' />
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

import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { getMaincategory } from "../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Store/ActionCreators/BrandActionCreators"
import { useDispatch, useSelector } from 'react-redux';
export default function Shop(props) {
    let [product, setProduct] = useState([])
    let [mc, setMc] = useState("All")
    let [sc, setSc] = useState("All")
    let [br, setBr] = useState("All")
    let [min, setMin] = useState(0)
    let [max, setMax] = useState(5000)
    let [flag, setFlag] = useState(false)
    let [search, setSearch] = useState("")

    let params = useParams()
    let dispatch = useDispatch()
    let allProductStateData = useSelector((state) => state.ProductStateData)
    let allMaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let allSubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let allBrandStateData = useSelector((state) => state.BrandStateData)


    function applyFilter(mc, sc, br) {
        if (mc === "All" && sc === "All" && br === "All")
            setProduct(allProductStateData)
        else if (mc !== "All" && sc === "All" && br === "All")
            setProduct(allProductStateData.filter((item) => item.maincategory === mc))
        else if (mc === "All" && sc !== "All" && br === "All")
            setProduct(allProductStateData.filter((item) => item.subcategory === sc))
        else if (mc === "All" && sc === "All" && br !== "All")
            setProduct(allProductStateData.filter((item) => item.brand === br))
        else if (mc !== "All" && sc !== "All" && br === "All")
            setProduct(allProductStateData.filter((item) => item.maincategory === mc && item.subcategory === sc))
        else if (mc !== "All" && sc === "All" && br !== "All")
            setProduct(allProductStateData.filter((item) => item.maincategory === mc && item.brand === br))
        else if (mc === "All" && sc !== "All" && br !== "All")
            setProduct(allProductStateData.filter((item) => item.brand === br && item.subcategory === sc))
        else
            setProduct(allProductStateData.filter((item) => item.maincategory === mc && item.subcategory === sc && item.brand === br))
    }
    function categoryFilter(mc, sc, br) {
        setMc(mc)
        setSc(sc)
        setBr(br)
        applyFilter(mc, sc, br)
    }
    function getPriceInput(e) {
        var { name, value } = e.target
        if (name === "min")
            setMin(value)
        else
            setMax(value)
    }
    function applyPriceFilter() {
        var p = []
        if (mc === "All" && sc === "All" && br === "All")
            p = allProductStateData
        else if (mc !== "All" && sc === "All" && br === "All")
            p = allProductStateData.filter((item) => item.maincategory === mc)
        else if (mc === "All" && sc !== "All" && br === "All")
            p = allProductStateData.filter((item) => item.subcategory === sc)
        else if (mc === "All" && sc === "All" && br !== "All")
            p = allProductStateData.filter((item) => item.brand === br)
        else if (mc !== "All" && sc !== "All" && br === "All")
            p = allProductStateData.filter((item) => item.maincategory === mc && item.subcategory === sc)
        else if (mc !== "All" && sc === "All" && br !== "All")
            p = allProductStateData.filter((item) => item.maincategory === mc && item.brand === br)
        else if (mc === "All" && sc !== "All" && br !== "All")
            p = allProductStateData.filter((item) => item.brand === br && item.subcategory === sc)
        else
            p = allProductStateData.filter((item) => item.maincategory === mc && item.subcategory === sc && item.brand === br)

        setProduct(p.filter((item) => item.finalprice >= min && item.finalprice <= max))

    }
    function appySortFilter(e) {
        if (e.target.value === "1")
            setProduct(product.sort((x, y) => y.id - x.id))
        else if (e.target.value === "2")
            setProduct(product.sort((x, y) => x.finalprice - y.finalprice))
        else
            setProduct(product.sort((x, y) => y.finalprice - x.finalprice))
        setFlag(!flag)
    }
    function getSearchInput(e) {
        setSearch(e.target.value)
    }
    function postSearch() {
        var searchTerm = search.toLocaleLowerCase()
        setProduct(allProductStateData.filter((item) => item.name.toLowerCase().includes(searchTerm) || item.maincategory.toLocaleLowerCase() === searchTerm || item.subcategory.toLocaleLowerCase() === searchTerm || item.brand.toLocaleLowerCase() === searchTerm || item.color.toLocaleLowerCase() === searchTerm || item.size.toLocaleLowerCase() === searchTerm || item.description.toLocaleLowerCase().includes(searchTerm)))
    }
    function getAPIData() {
        dispatch(getProduct())
        dispatch(getMaincategory())
        dispatch(getSubcategory())
        dispatch(getBrand())
        setMc(params.mc)
        setSc(params.sc)
        setBr(params.br)
        applyFilter(params.mc, params.sc, params.br)
    }
    useEffect(() => {
        getAPIData()
    }, [params, allProductStateData.length, allMaincategoryStateData.length, allSubcategoryStateData.length, allBrandStateData.length])
    return (
        <>
            {/* <!-- Breadcrumb Begin --> */}
            <div className="breadcrumb-option">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                <span>Shop</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcrumb End --> */}

            {/* <!-- Shop Section Begin --> */}
            <section className="shop spad">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-3">
                            <div className="shop__sidebar">
                                <div className="sidebar__categories">
                                    <div className="categories__accordion card p-3">
                                        <div className="accordion" id="accordionExample">
                                            <div className="list-group">
                                                <div className="section-title">
                                                    <h4>Maincategory</h4>
                                                </div>
                                                <button onClick={() => categoryFilter("All", sc, br)} className="list-group-item list-group-item-action">All</button>
                                                {
                                                    allMaincategoryStateData && allMaincategoryStateData.map((item, index) => {
                                                        return <button onClick={() => categoryFilter(item.name, sc, br)} key={index} className="list-group-item list-group-item-action">{item.name}</button>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="categories__accordion card p-3">
                                        <div className="accordion" id="accordionExample">
                                            <div className="list-group">
                                                <div className="section-title">
                                                    <h4>Subcategory</h4>
                                                </div>
                                                <button onClick={() => categoryFilter(mc, "All", br)} className="list-group-item list-group-item-action">All</button>
                                                {
                                                    allSubcategoryStateData && allSubcategoryStateData.map((item, index) => {
                                                        return <button onClick={() => categoryFilter(mc, item.name, br)} key={index} className="list-group-item list-group-item-action">{item.name}</button>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                    <div className="categories__accordion card p-3">
                                        <div className="accordion" id="accordionExample">
                                            <div className="list-group">
                                                <div className="section-title">
                                                    <h4>Brand</h4>
                                                </div>
                                                <button onClick={() => categoryFilter(mc, sc, "All")} className="list-group-item list-group-item-action">All</button>
                                                {
                                                    allBrandStateData && allBrandStateData.map((item, index) => {
                                                        return <button onClick={() => categoryFilter(mc, sc, item.name)} key={index} className="list-group-item list-group-item-action">{item.name}</button>
                                                    })
                                                }
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                <div className="sidebar__filter">

                                    <div className="card p-3">
                                        <div className="section-title mb-3">
                                            <h4>Shop by price</h4>
                                        </div>
                                        <div className="btn-group">
                                            <div className="mb-3">
                                                <label>Min</label>
                                                <input type="text" name="min" className='form-control w-100' value={min} onChange={getPriceInput} />
                                            </div>
                                            <div className="mb-3">
                                                <label>Max</label>
                                                <input type="text" name="max" className='form-control w-100' value={max} onChange={getPriceInput} />
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={applyPriceFilter} className='btn btn-secondary w-100'>Filter</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-9 col-md-9">
                            <div className="row mb-3">
                                <div className="col-md-9 btn-group">
                                    <input type="search" name='search' onChange={getSearchInput} value={search} placeholder='Enter Name, Maincategory,Subcategory, Brand, Color, Size etc to Search : ' className='form-control' />
                                    <button className='btn btn-success' onClick={postSearch}>Search</button>
                                </div>
                                <div className="col-md-3">

                                    <select name="sortFilter" onChange={appySortFilter} className='form-control'>
                                        <option value="1">Newsest</option>
                                        <option value="2">Price Low to High</option>
                                        <option value="3">Price High to Low</option>
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                                {
                                    product.map((item, index) => {
                                        return <div key={index} className="col-md-4 col-sm-6 mix women">
                                            <div className="product__item">
                                                <Link to={`/single-product/${item._id}`}>
                                                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url("/public/uploads/products/${item.pic1}")` }}>
                                                        <div className="label new">New</div>
                                                    </div>
                                                </Link>
                                                <div className="product__item__text">
                                                    <h6><Link to={`/single-product/${item._id}`}>{item.name}</Link></h6>
                                                    <div className="product__price"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <span className='text-success text-decoration-none'>{item.discount}% Off</span></div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Shop Section End --> */}

        </>
    );
}
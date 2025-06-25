import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { getCart, createCart } from "../Store/ActionCreators/CartActionCreators"
import { getWishlist, createWishlist } from "../Store/ActionCreators/WishlistActionCreators"
import { useDispatch, useSelector } from 'react-redux';
export default function ProductDetails(props) {
    let [qty, setQty] = useState(1)
    var { _id } = useParams()
    let [product, setproduct] = useState({
        pic1: "",
        pic2: "",
        pic3: "",
        pic4: "",
    })
    let navigate = useNavigate()
    let [relatedProducts, setRelatedProducts] = useState([])
    let dispatch = useDispatch()
    let allProductStateData = useSelector((state) => state.ProductStateData)
    let allCartStateData = useSelector((state) => state.CartStateData)
    let allWishlistStateData = useSelector((state) => state.WishlistStateData)
    function addToCart() {
        var item = allCartStateData.find((x) => x.userid === localStorage.getItem("userid") && x.productid === _id)
        if (!item) {
            item = {
                userid: localStorage.getItem("userid"),
                productid: product._id,
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalprice,
                qty: qty,
                total: qty * product.finalprice,
                pic: product.pic1,
            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }
    function addToWishlist() {
        var item = allWishlistStateData.find((x) => x.userid === localStorage.getItem("userid") && x.productid === _id)
        if (!item) {
            item = {
                userid: localStorage.getItem("userid"),
                productid: product._id,
                name: product.name,
                brand: product.brand,
                color: product.color,
                size: product.size,
                price: product.finalprice,
                pic: product.pic1,
            }
            dispatch(createWishlist(item))
        }
        navigate("/profile")
    }
    function getAPIData() {
        dispatch(getProduct())
        dispatch(getCart())
        dispatch(getWishlist())
        if (allProductStateData.length) {
            let item = allProductStateData.find((item) => item._id === _id)
            if (item)
                setproduct(item)

            setRelatedProducts(allProductStateData.filter((x) => x.maincategory === item.maincategory && x.subcategory === item.subcategory && x.brand === item.brand && x.id !== item.id))
        }
    }
    useEffect(() => {
        getAPIData()
    }, [allProductStateData.length, allCartStateData.length, allWishlistStateData.length])
    return (
        <>
            {/* <!-- Breadcrumb Begin --> */}
            <div className="breadcrumb-option">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="breadcrumb__links">
                                <Link to="/"><i className="fa fa-home"></i> Home</Link>
                                <Link to={`/shop/${product.maincategory}/All/All`}>{product.maincategory} </Link>
                                <span>{product.name}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <!-- Breadcrumb End --> */}

            {/* <!-- Product Details Section Begin --> */}
            <section className="product-details my-2 p-2">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7">
                            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                                <div className="row">
                                    <div className="col-3 d-flex flex-column justify-content-between">
                                        <img src={`/public/uploads/products/${product.pic1}`} height="100px" width="100px" alt="" data-target="#carouselExampleIndicators" data-slide-to="0" className="active" />
                                        <img src={`/public/uploads/products/${product.pic2}`} height="100px" width="100px" alt="" data-target="#carouselExampleIndicators" data-slide-to="1" />
                                        <img src={`/public/uploads/products/${product.pic3}`} height="100px" width="100px" alt="" data-target="#carouselExampleIndicators" data-slide-to="2" />
                                        <img src={`/public/uploads/products/${product.pic4}`} height="100px" width="100px" alt="" data-target="#carouselExampleIndicators" data-slide-to="3" />
                                    </div>
                                    <div className="col-9">
                                        <ol className="carousel-indicators">
                                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                                        </ol>
                                        <div className="carousel-inner">
                                            <div className="carousel-item active">
                                                <img src={`/public/uploads/products/${product.pic1}`} height="450px" className="d-block w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={`/public/uploads/products/${product.pic2}`} height="450px" className="d-block w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={`/public/uploads/products/${product.pic3}`} height="450px" className="d-block w-100" alt="..." />
                                            </div>
                                            <div className="carousel-item">
                                                <img src={`/public/uploads/products/${product.pic4}`} height="450px" className="d-block w-100" alt="..." />
                                            </div>
                                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Previous</span>
                                            </a>
                                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                                <span className="sr-only">Next</span>
                                            </a>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-5">
                            <div className="product__details__text">
                                <div className="table-responsive">
                                    <table className='table table-bordered table-stripped table-hover'>
                                        <tr>
                                            <th colSpan={2}>{product.name}</th>
                                        </tr>
                                        <tr>
                                            <th>Category</th>
                                            <td>{product.maincategory}/{product.subcategory}/{product.brand}</td>
                                        </tr>
                                        <tr>
                                            <th>Color</th>
                                            <td>{product.color}</td>
                                        </tr>
                                        <tr>
                                            <th>Size</th>
                                            <td>{product.size}</td>
                                        </tr>
                                        <tr>
                                            <th>Price</th>
                                            <td><del className='text-danger'>&#8377;{product.baseprice}</del> &#8377;{product.finalprice} <sup className='text-success'>{product.discount}% Off</sup></td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className='text-justify'>{product.description}</td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2} className='d-flex justify-content-between'>
                                                <button className='btn btn-secondary btn-sm' onClick={() => {
                                                    if (qty > 1)
                                                        setQty(qty - 1)
                                                }}><i className='fa fa-minus'></i></button>
                                                <h4>{qty}</h4>
                                                <button className='btn btn-secondary btn-sm' onClick={() => setQty(qty + 1)}><i className='fa fa-plus'></i></button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={2}>
                                                <div className="btn-group w-100">
                                                    <button className='w-50 btn btn-secondary btn-sm' onClick={addToCart}><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                                                    <button className='w-50 btn btn-success btn-sm' onClick={addToWishlist}><i className='fa fa-heart'></i> Add to Wishlist</button>
                                                </div>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        relatedProducts.length ?
                            <>
                                <div className="text-center mt-3">
                                    <div className="related__title">
                                        <h5>RELATED PRODUCTS</h5>
                                    </div>
                                </div>
                                <OwlCarousel loop navText={(1)} margin={2} items={4} style={{ justifyContent: "center", margin: "20px 0 1px 0" }}>
                                    {
                                        relatedProducts.map((item, index) => {
                                            return <div key={index} className="product__item">
                                                <Link to={`/single-product/${item.id}`}>
                                                    <div className="product__item__pic set-bg" style={{ backgroundImage: `url("/public/uploads/products/${item.pic1}")` }}>
                                                        <div className="label new">New</div>
                                                    </div>
                                                </Link>
                                                <div className="product__item__text">
                                                    <h6><Link to={`/single-product/${item.id}`}>{item.name}</Link></h6>
                                                    <div className="product__price"><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <span className='text-success text-decoration-none'>{item.discount}% Off</span></div>
                                                </div>
                                            </div>
                                        })
                                    }
                                </OwlCarousel>
                            </>
                            : ""
                    }
                </div>
            </section >
            {/* <!-- Product Details Section End --> */}
        </>
    );
}
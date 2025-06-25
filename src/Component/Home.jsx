import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import OwlCarousel from 'react-owl-carousel';

import { getProduct } from "../Store/ActionCreators/ProductActionCreators"
import { useDispatch, useSelector } from 'react-redux';
export default function Home(props) {
    let [product, setproduct] = useState([])
    let dispatch = useDispatch()
    let allProductStateData = useSelector((state) => state.ProductStateData)
    function getAPIData() {
        dispatch(getProduct())
        if (allProductStateData.length) {
            setproduct(allProductStateData.slice(0, 8))
        }
    }
    useEffect(() => {
        getAPIData()
    }, [allProductStateData.length])
    return (
        <>
            {/* <!-- Categories Section Begin --> */}
            <section className="categories">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="categories__item categories__large__item set-bg"
                                style={{ backgroundImage: 'url("img/categories/category-1.jpg")' }}>
                                <div className="categories__text">
                                    <h1>Women’s fashion</h1>
                                    <p>Sitamet, consectetur adipiscing elit, sed do eiusmod tempor incidid-unt labore
                                        edolore magna aliquapendisse ultrices gravida.</p>
                                    <Link to="/shop/Female/All/All">Shop now</Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className="row">
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div className="categories__item set-bg" style={{ backgroundImage: 'url("img/categories/category-2.jpg")' }}>
                                        <div className="categories__text">
                                            <h4>Men’s fashion</h4>
                                            <Link to="/shop/Male/All/All">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div className="categories__item set-bg" style={{ backgroundImage: 'url("img/categories/category-5.jpg")' }}>
                                        <div className="categories__text">
                                            <h4>Kid’s fashion</h4>
                                            <Link to="/shop/Kids/All/All">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div className="categories__item set-bg" style={{ backgroundImage: 'url("img/categories/category-4.jpg")' }}>
                                        <div className="categories__text">
                                            <h4>Cosmetics</h4>
                                            <Link to="/shop/All/All/All">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6 col-sm-6 p-0">
                                    <div className="categories__item set-bg" style={{ backgroundImage: 'url("img/categories/category-3.jpg")' }}>
                                        <div className="categories__text">
                                            <h4>Accessories</h4>
                                            <Link to="/shop/All/All/All">Shop now</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Categories Section End --> */}

            {/* <!-- Product Section Begin --> */}
            <section className="product spad">
                <div className="container">
                    <div className="section-title text-center">
                        <h4>New product</h4>
                    </div>
                    <div className="row property__gallery">
                        {
                            product.map((item, index) => {
                                return <div key={index} className="col-lg-3 col-md-4 col-sm-6 mix women">
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
            </section>
            {/* <!-- Product Section End --> */}

            {/* <!-- Banner Section Begin --> */}
            <section className="banner set-bg" style={{ backgroundImage: 'url("img/banner/banner-1.jpg")' }}>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-7 col-lg-8 m-auto">
                            <OwlCarousel loop navText={(1)} margin={10} items={1} style={{ justifyContent: "center", margin: "200px 0" }}>
                                <div className="banner__item">
                                    <div className="banner__text text-center">
                                        <span>The Latest Fashion Collection</span>
                                        <h1>Latest Female Collection</h1>
                                        <Link to="/shop/Female/All/All">Shop now</Link>
                                    </div>
                                </div>
                                <div className="banner__item">
                                    <div className="banner__text text-center">
                                        <span>The Latest Fashion Collection</span>
                                        <h1>Latest Male Collection</h1>
                                        <Link to="/shop/Male/All/All">Shop now</Link>
                                    </div>
                                </div>
                                <div className="banner__item">
                                    <div className="banner__text text-center">
                                        <span>The Latest Fashion Collection</span>
                                        <h1>Latest Kids Collection</h1>
                                        <Link to="/shop/Kids/All/All">Shop now</Link>
                                    </div>
                                </div>
                            </OwlCarousel>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Banner Section End --> */}



            {/* <!-- Discount Section Begin --> */}
            <section className="discount">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 p-0">
                            <div className="discount__pic">
                                <img src="img/discount.jpg" alt="" />
                            </div>
                        </div>
                        <div className="col-lg-6 p-0">
                            <div className="discount__text">
                                <div className="discount__text__title">
                                    <span>Discount</span>
                                    <h5><span>Sale</span> 90%</h5>
                                    <Link to="/shop/All/All/All" className='btn btn-secondary text-light p-2'>Shop now</Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Discount Section End --> */}

            {/* <!-- Services Section Begin --> */}
            <section className="services spad">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-car"></i>
                                <h6>Free Shipping</h6>
                                <p>For all oder over $99</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-money"></i>
                                <h6>Money Back Guarantee</h6>
                                <p>If good have Problems</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-support"></i>
                                <h6>Online Support 24/7</h6>
                                <p>Dedicated support</p>
                            </div>
                        </div>
                        <div className="col-lg-3 col-md-4 col-sm-6">
                            <div className="services__item">
                                <i className="fa fa-headphones"></i>
                                <h6>Payment Secure</h6>
                                <p>100% secure payment</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* <!-- Services Section End --> */}
        </>
    );
}
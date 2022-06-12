import React, { Fragment, useEffect } from 'react'
import { CgMouse } from "react-icons/cg"
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from '../Layout/MetaData';
import { getProduct, ClearErrors } from "../../Actions/ProductAction";
import { useSelector, useDispatch } from "react-redux"
import Loader from '../Layout/Loader/Loader';
import { useAlert } from "react-alert";

const Home = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products)

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(ClearErrors())
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])


    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <>
                    <MetaData title="AestheticWatchIllusion" />

                    <div className="banner">
                        <p>Welcome to our AestheticWatchIllusion</p>
                        <h1>FIND OUR AMIZING PRODUCT BELLOW</h1>

                        <a href="#container">
                            <button>
                                Scroll <CgMouse />
                            </button>
                        </a>
                    </div>

                    <h2 className='homeHeading'>Feature Product</h2>

                    <div className="container" id='container'>
                        {products && products.map(product => (
                            <ProductCard 
                            key={product._id}
                            product={product} />
                        ))}
                    </div>
                </>
            )
            }
        </Fragment>
    )
}

export default Home
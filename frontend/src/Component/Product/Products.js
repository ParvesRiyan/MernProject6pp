import React, { Fragment, useState, useEffect } from 'react'
import "./Products.css";
import { useParams,} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux"
import { ClearErrors, getProduct } from '../../Actions/ProductAction';
import Loader from '../Layout/Loader/Loader';
import ProductCard from '../Home/ProductCard';
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { useAlert } from "react-alert";
import Typography from "@material-ui/core/Typography";
import MetaData from "../Layout/MetaData";

const categories = [
  "laptop",
  "smartphone",
  "desktop",
  "footware",
  "womens",
  "mens",
  "children"
]

const Products = () => {

  const keyword = useParams()

  const dispatch = useDispatch();

  const alert = useAlert();

  const [currentPage, setCurrentPage] = useState(1)
  const [price, setPrice] = useState([0, 125000]);
  const [category, setCategory] = useState("")
  const [ratings, setRatings] = useState(0)


  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount
  } = useSelector(state => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e)
  }

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice)
  }

  useEffect(() => {

    if(error){
      alert.error(error)
      dispatch(ClearErrors())
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings))
  }, [dispatch, keyword, currentPage, price, category, ratings, alert, error])

  // console.log(products);
  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (<Loader />) :
        <>
          <MetaData title="PRODUCT---AestheticWatchIllusion" />
          <h2 className='productsHeading'>Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={125000}
            />

            <Typography>Categories</Typography>
            <ul className='categoryBox'>
              {
                categories.map((category)=>(
                  <li
                    className='category-link'
                    key={category}
                    onClick={()=>setCategory(category)}
                  >
                    {category}
                  </li>
                ))
              }
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider 
                value={ratings}
                onChange={(e, newRating)=>{
                  setRatings(newRating)
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>

          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}

        </>
      }
    </Fragment>
  )
}

export default Products
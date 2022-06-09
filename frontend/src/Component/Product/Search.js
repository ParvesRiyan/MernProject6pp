import React,{useState} from 'react'
import { useNavigate } from 'react-router';
import MetaData from '../Layout/MetaData';
import "./Search.css";


const Search = () => {

    const [keyword, setKeyword] = useState("");
    console.log(keyword);

    const navigate = useNavigate();

    const searchSubmitHandler = (e)=>{
        e.preventDefault();
        
        if(keyword.trim()){
            navigate(`/products/${keyword}`);
        }else{
            navigate(`/products`)
        }
    }

    return (
        <>  
            <MetaData title="ECOMMERCE--Search a product.." />
            <form className='searchBox' method='GET' onSubmit={searchSubmitHandler}>
                <input
                    type="text"
                    placeholder='Searche a Product...'
                    onChange={(e)=>setKeyword(e.target.value)}
                />
                <input type="submit" value="Search" />
            </form>
        </>
    )
}

export default Search
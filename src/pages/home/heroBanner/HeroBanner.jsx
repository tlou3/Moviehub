import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import "./style.scss";

import useFetch from '../../../hooks/useFetch';

import Img from '../../../components/lazyLoadImage/Img';
import ContentWrapper from '../../../components/contentWrapper/ContentWrapper';

const HeroBanner = () => {
    const[background,setBackground]=useState("");
    const[query,setQuery]=useState("");
    const navigate =useNavigate();
    const {url} =useSelector((state) => state.home);//in home we got url by destru,api->stor->here

    const{data,loading} = useFetch("/movie/upcoming");// using api by hooks,see netwo

    useEffect(() => {
        const bg =
        url.backdrop +//
        data?.results?.[Math.floor(Math.random() * 20)]?.backdrop_path;
        setBackground(bg);// now we get proper url
    },[data]);// as data is recie,bg is set by taking bgimg from any 20 upcomin

    const searchQueryHandler =(event)=>{//only enter or cond for api call
        if(event.key === "Enter" && query.length > 0){
            navigate(`/search/${query}`);//will go seach page with query given , see app.jsx

        }

    }
  return (
    <div className='heroBanner'>
       {!loading && <div className='backdrop-img'>
            <Img src={background} />
        </div>}

        <div className="opacity-layer"></div>
        <ContentWrapper>
            <div className="heroBannerContent">
                <span className="title">Welcome to MovieHub</span>
                <span className="subTitle">
                    Search for Movies/Tv Shows 
                </span>
                <div className="searchInput">
                    <input 
                    type="text"
                    placeholder='movie/tv show'
                    onChange={(e)=> setQuery(e.target.value)}//type changes,set state
                    onKeyUp={searchQueryHandler}

                     />
                     <button>search</button>
                </div>
            </div>
        </ContentWrapper>
        
    </div>
  )
}

export default HeroBanner

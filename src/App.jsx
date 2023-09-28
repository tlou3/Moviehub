import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";


import { fetchDataFromApi } from './utils/api';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getApiConfiguration, getGenres} from './store/homeSlice';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import SearchResult from "./pages/searchResult/SearchResult";
import Explore from "./pages/explore/Explore";
import PageNotFound from "./pages/404/PageNotFound";


function App() {
  const dispatch = useDispatch();
  const { url } = useSelector((state) => state.home);// .home is imp,otherwise comple return,store
  console.log(url);
//IMP
  // useEffect(() => {
  //   apiTesting();
  // }, []);

  // const apiTesting = () => {// repeat code ,so use hook
  //   fetchDataFromApi("/movie/popular").then((res) => {
  //     console.log(res);//normal
  //     dispatch(getApiConfiguration(res));// shows in redx, got res above from api and now stor it in redux store(u made)
  //   });
  // };

  useEffect(() => {
    FetchApiConfig();
    genresCall();
  }, []);

  const FetchApiConfig = () => {// repeat code ,so use hook,, for image size and selec
    fetchDataFromApi("/configuration").then((res) => {
      console.log(res);//normal

      const url ={
        backdrop: res.images.secure_base_url+"original",//got from netw/config,orig->aize
        poster: res.images.secure_base_url+"original",
        profile: res.images.secure_base_url+"original",
      };
      dispatch(getApiConfiguration(url));// shows in redx??
    });
  };

  const genresCall = async () => {
    let promises = [];
    let endPoints = ["tv", "movie"];
    let allGenres = {};// final stoed here

    endPoints.forEach((url) => {
        promises.push(fetchDataFromApi(`/genre/${url}/list`));//url->tv,mov(2 api call)
    });

    const data = await Promise.all(promises);// both got(tv mov) toge
    console.log(data);// both gen(tv mov) togth in 1 arr in form of 2obj
    data.map(({ genres }) => {// dest,get gen1,2
        return genres.map((item) => (allGenres[item.id] = item));// key-> val(entir item ehich was recie, check in cons)
    });
    // console.log(allGenres);

    dispatch(getGenres(allGenres));// dis->action->allgen, which we creat from api call and storing it in store using disp
};

  return (
    // <div className="App">
    //   App
    //   {url?.total_pages}
    //    </div>//? mark doesnt break app if url is still being featc
    <BrowserRouter>
          <Header />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/:mediaType/:id" element={<Details />} />
        <Route path="/search/:query" element={<SearchResult />} />
        <Route path="/explore/:mediaType" element={<Explore />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );

}

export default App

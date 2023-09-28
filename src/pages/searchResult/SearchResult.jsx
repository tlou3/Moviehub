import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchDataFromApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";
import noResults from "../../assets/no-results.png";
const searchResult = () => {
  const [data, setData] = useState(null);
  const [pageNum, setPageNum] = useState(1);//each page 20,next pag api call
  const [loading, setLoading] = useState(false);
  const { query } = useParams();//searc in ,chec app

  const fetchInitialData = () => {
    setLoading(true);//for spinn activ?
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(//fetc data of wrii quer, init pag1=20 item
      (res) => {
        setData(res);//res in data
        setPageNum((prev) => prev + 1);//1+1,prev+1
        setLoading(false);
      });
  }
  const fetchNextPageData = () => {//keep prev data+new data
    fetchDataFromApi(`/search/multi?query=${query}&page=${pageNum}`).then(
      (res) => {
        if (data?.results) {//data alredy there
          setData({
            ...data,
            results: [...data?.results, ...res.results],//prev and new merge
          });
        } else {
          setData(res);//if no prev data,simpl give new dat
        }
        setPageNum((prev) => prev + 1);//2->3
      }
    );
  };

  useEffect(() => {
    setPageNum(1);// for new quer ,set 1
    fetchInitialData();
  }, [query]);// whenev quer chana, fetc is call again b/c useeff 

  return (
    <div className="searchResultsPage">
      {loading && <Spinner initial={true} />}
      {!loading && (
        <ContentWrapper>
          {data?.results?.length > 0 ? (
            <>
              <div className="pageTitle">
                {`Search ${data?.total_results > 1
                    ? "results"
                    : "result"
                  } of '${query}'`}
              </div>
              <InfiniteScroll
                className="content"
                dataLength={data?.results?.length || []}//20 or what u get from api
                next={fetchNextPageData}// for call again
                hasMore={pageNum <= data?.total_pages}// still remain
                loader={<Spinner />}
              >
                {data?.results.map((item, index) => {
                  if (item.media_type === "person") return;//pers name sometim
                  return (
                    <MovieCard //indi data item sent
                      key={index}
                      data={item}
                      fromSearch={true}
                    />
                  );
                })}
              </InfiniteScroll>
            </>
          ) : (//len<0(no resul)
            <span className="resultNotFound">
              Sorry, Results not found!
            </span>
          )}
        </ContentWrapper>
      )}
    </div>
  );
};

export default searchResult;

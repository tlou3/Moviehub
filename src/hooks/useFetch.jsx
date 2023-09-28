import { useEffect, useState } from "react";
import { fetchDataFromApi } from "../utils/api";

const useFetch = (url) => {
    const [data, setData] = useState(null);//init all sta null
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading("loading...");//
        setData(null);// req if url chan belowsee
        setError(null);

        fetchDataFromApi(url)// api call
            .then((res) => {
                setLoading(false);// dat reciv
                setData(res);// set reci data
            })
            .catch((err) => {
                setLoading(false);// not recie
                setError("Something went wrong!");
            });
    }, [url]);// url-> if url changes useeff is called again 

    return { data, loading, error };
};

export default useFetch;
import React from "react";
import { useSelector } from "react-redux";

import "./style.scss";

const Genres = ({ data }) => {//dat-> all ids recie
    const { genres } = useSelector((state) => state.home);//genres now has all gen stored in store(which waas)

    return (
        <div className="genres">
            {data?.map((g) => {//iter  ov data
                if (!genres[g]?.name) return;//not avail
                return (//get name of that stored genre in store redu ,878->name
                    <div key={g} className="genre">
                        {genres[g]?.name}
                    </div>
                );
            })}
        </div>
    );
};

export default Genres;
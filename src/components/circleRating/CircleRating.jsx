import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";//defau from react ready 
import "react-circular-progressbar/dist/styles.css";

import "./style.scss";

const CircleRating = ({ rating }) => {//gets ratin from api and make circ 
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={rating}
                maxValue={10}//for circle filling
                text={rating}
                styles={buildStyles({
                    pathColor:
                        rating < 5 ? "red" : rating < 7 ? "orange" : "green",
                })}
            />
        </div>
    );
};

export default CircleRating;
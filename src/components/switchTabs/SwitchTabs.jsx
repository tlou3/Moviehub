import React, { useState } from "react";

import "./style.scss";

const SwitchTabs = ({ data, onTabChange }) => {
    const [selectedTab, setSelectedTab] = useState(0);
    const [left, setLeft] = useState(0);//left trans

    const activeTab = (tab, index) => {
        setLeft(index * 100);//move,100,200,1block
        setTimeout(() => {
            setSelectedTab(index);
        }, 300);//anima for day,wee
        onTabChange(tab, index);
    };

    return (
        <div className="switchingTabs">
            <div className="tabItems">
                {data.map((tab, index) => (
                    <span
                        key={index}
                        className={`tabItem ${
                            selectedTab === index ? "active" : ""
                        }`}//loop
                        onClick={() => activeTab(tab, index)}
                    >
                        {tab}
                    </span>
                ))}
                <span className="movingBg" style={{ left }} />
                
            </div>
        </div>
    );
};

export default SwitchTabs;
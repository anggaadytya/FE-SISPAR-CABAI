import React from "react";
import BarChart from "../../../components/Chart/Chart";
import SideBar from "../../../components/sidebar/SideBar";

const CrossValidation = () => {
  return (
    <div className="AppMain">
      <div className="AppGlass">
        <SideBar id={5} />
        <div className="MainDashGejala">
          <h1>Cross Validation</h1>
          <BarChart/>
        </div>
      </div>
    </div>
  );
};

export default CrossValidation;

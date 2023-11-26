import { useEffect, useState } from "react";
import Cards from "../../../components/Cards/Cards";
import SideBar from "../../../components/sidebar/SideBar";
import Table from "../../../components/Table/Table";

import "./Dashboard.css";

const Dashboard = () => {
  const [getDataUser, setGetDataUser] = useState([]);

  useEffect(() => {
    getUsersData();
  }, []);

  const getUsersData = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/users`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      setGetDataUser(jsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="AppMain">
      <div className="AppGlass">
        <SideBar id={0} />
        <div className="MainDash">
          <h1>Dashboard</h1>
          <Cards />
          <Table getdatauser={getDataUser} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

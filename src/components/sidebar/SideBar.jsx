import reactLogo from "../../assets/logoBaru.png";
import "./SideBar.css";

import { SideBarData } from "./DataSideBar";
import { UilSignOutAlt } from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const SideBar = (props) => {
  const [selected, setSelected] = useState(props.id);
  const navigate = useNavigate();

  const handleLinkClick = (id, link) => {
    setSelected(id);
    navigate(link);
  };

  return (
    <div className="Sidebar">
      <div className="logo">
        <img src={reactLogo} alt="React Logo" />
        <span className="span3">SISPAR</span>
        <span className="span4">CABAI</span>
      </div>

      <div className="menu">
        {SideBarData.map((item, id) => {
          return (
            <Link
              key={id}
              className={selected === id ? "menuItem active" : "menuItem"}
              onClick={() => handleLinkClick(id, item.link)}
            >
              <item.icon />
              <span>{item.heading}</span>
            </Link>
          );
        })}
        <a href="/" style={{ color: "black" }} className="menuItem2">
          <UilSignOutAlt />
        </a>
      </div>
    </div>
  );
};

export default SideBar;

import "./Card.css";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Card = (props) => {
  const PNG = props.png;

  return (
    <div
      className="CompactCard"
      style={{
        background: props.color.backGround,
        boxShadow: props.color.boxShadow,
      }}
    >
      <div className="radialBar">
        <CircularProgressbar
          value={props.barValue}
          text={`${props.barValue}%`}
        />
      </div>
      <div className="detail">
        <PNG />
        <span>{props.tittle}</span>
      </div>
    </div>
  );
};

export default Card;

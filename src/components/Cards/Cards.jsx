import { DataCards } from "./DataCards.js";
import "./Cards.css";
import Card from "../Card/Card.jsx";

const Cards = () => {
  return (
    <div className="Cards">
      {DataCards.map((card, id) => {
        return(
          <div className="parentContainer" key={id}>
            <Card
              tittle={card.tittle}
              color={card.color}
              barValue={card.barValue}
              value={card.value}
              png={card.png}
            />
          </div>
        )
      })}
    </div>
  );
};

export default Cards;

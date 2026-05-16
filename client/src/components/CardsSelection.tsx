import { cards, type CardType } from "../utils/cards";
import Card from "./Card";

const CardsSelection = () => {
  return (
    <div className="cards-selection-container w-100 d-flex flex-wrap justify-content-between">
      {cards.map((card) => (
        <Card
          card={card as CardType}
          handleCardClick={() => {
            console.log(card.name);
          }}
        />
      ))}
    </div>
  );
};

export default CardsSelection;

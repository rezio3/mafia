import { cards, type CardType } from "../../utils/cards";
import Card from "../Card/Card";
import socket from "../../socket";
import FractionColorLegend from "../FractionColorLegend/FractionColorLegend";
import Header from "../Header";
import "./cardsSelections.scss";

type CardsSelectionPropsType = {
  selectedCards: string[];
  isHost: boolean;
  roomCode: string;
};

const CardsSelection: React.FC<CardsSelectionPropsType> = ({
  selectedCards,
  isHost,
  roomCode,
}) => {
  const handleCardToggle = (cardName: string) => {
    if (isHost) {
      socket.emit("toggle_card", { roomCode, cardName });
    }
  };
  return (
    <div className="d-flex flex-column align-items-center gap-1 mt-3">
      <Header variant="h6">
        Liczba wybranych kart: {selectedCards.length}
      </Header>
      <FractionColorLegend />
      <div className="small-cards-container">
        {cards.map((card, index) => {
          const isSelected = selectedCards.includes(card.name);
          return (
            <Card
              card={card as CardType}
              isSelected={isSelected}
              handleCardClick={() => handleCardToggle(card.name)}
              key={card.name + index}
              isSmall
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardsSelection;

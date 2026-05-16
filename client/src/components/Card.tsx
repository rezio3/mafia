import { Typography } from "@mui/material";
import type { CardType } from "../utils/cards";
import { useState } from "react";

type CardPropsType = {
  card: CardType;
  handleCardClick: () => void;
};

const Card: React.FC<CardPropsType> = ({ card, handleCardClick }) => {
  const [isSelected, setIsSelected] = useState(false);
  return (
    <div
      className={`role-card ${isSelected && "card-selected"}`}
      onClick={() => {
        handleCardClick();
        setIsSelected(!isSelected);
      }}
    >
      <Typography variant="h6" className="text-center" style={{ fontSize: 15 }}>
        {card.name}
      </Typography>
      <Typography
        variant="body1"
        className="text-center"
        style={{ fontSize: 10 }}
      >
        {card.description}
      </Typography>
    </div>
  );
};

export default Card;

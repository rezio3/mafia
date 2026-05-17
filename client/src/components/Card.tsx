import { Typography } from "@mui/material";
import { type CardType } from "../utils/cards";
import { useState } from "react";
import { getBadgeColor } from "../utils/getBadgeCardColor";
import InfoIcon from "@mui/icons-material/Info";
import { CardModal } from "./CardModal";

type CardPropsType = {
  card: CardType;
  isSelected: boolean;
  handleCardClick: () => void;
};

const Card: React.FC<CardPropsType> = ({
  card,
  isSelected,
  handleCardClick,
}) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleClose = () => {
    setModalOpen(false);
  };
  const handleMoreCardInfoButton = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setModalOpen(true);
  };
  return (
    <>
      <div
        className={`role-card ${isSelected && "card-selected"}`}
        onClick={handleCardClick}
      >
        <div
          className="card-badge"
          style={{ backgroundColor: getBadgeColor(card.fraction) }}
        />
        <div
          style={{ padding: "4px 4px", height: "100%", width: "100%" }}
          className="d-flex flex-column justify-content-between"
        >
          <div>
            <Typography
              variant="h6"
              className="text-center"
              style={{ fontSize: 10, fontWeight: 700 }}
            >
              {card.name}
            </Typography>
          </div>
          <div className="d-flex justify-content-center">
            <button
              onClick={handleMoreCardInfoButton}
              className="button-no-styles"
            >
              <InfoIcon />
            </button>
          </div>
        </div>
      </div>
      <CardModal handleClose={handleClose} open={modalOpen} card={card} />
    </>
  );
};

export default Card;

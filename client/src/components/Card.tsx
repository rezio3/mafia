import { Typography } from "@mui/material";
import { type CardType } from "../utils/cards";
import { useState } from "react";
import { getBadgeColor } from "../utils/getBadgeCardColor";
import InfoIcon from "@mui/icons-material/Info";
import { CardModal } from "./CardModal";

type CardPropsType = {
  card: CardType;
  isSelected: boolean;
  handleCardClick?: () => void;
  isSmall?: boolean;
};

const Card: React.FC<CardPropsType> = ({
  card,
  isSelected,
  handleCardClick,
  isSmall,
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
        className={`role-card ${isSelected ? "card-selected" : ""}`}
        onClick={handleCardClick}
        style={{
          cursor: handleCardClick ? "pointer" : "default",
          height: isSmall ? "70px" : undefined,
        }}
      >
        <div
          className="card-badge"
          style={{ backgroundColor: getBadgeColor(card.fraction) }}
        />
        <div
          style={{
            padding: isSmall ? "4px 4px" : "8px 8px 16px",
            height: "100%",
            width: "100%",
          }}
          className="d-flex flex-column justify-content-between"
        >
          <div>
            <Typography
              variant="h6"
              className="text-center"
              style={{ fontSize: isSmall ? 10 : 24, fontWeight: 700 }}
            >
              {card.name}
            </Typography>
            {!isSmall && (
              <Typography
                className="text-center mb-3"
                style={{ fontSize: 14, fontWeight: 400 }}
              >
                {card.note}
              </Typography>
            )}
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

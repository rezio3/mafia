import { useState } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header";
import { cards, type CardType } from "../../utils/cards";
import DropdownSection from "./Dropdowns/DropdownSection";
import { Button } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

type PlayerGameViewPropsType = {
  playerCardName: string | undefined | null;
  playerName: string | undefined | null;
  inGameCards: CardType[];
};

const PlayerGameView: React.FC<PlayerGameViewPropsType> = ({
  playerCardName,
  playerName,
  inGameCards,
}) => {
  const [showCard, setShowCard] = useState(false);

  const card = cards.find((card) => card.name === playerCardName);

  if (!card) {
    return <Header variant="h6">Nie znaleziono karty</Header>;
  }

  return (
    <>
      <Header variant="h5">{playerName} </Header>
      <Header variant="h6">Twoja funkcja to:</Header>
      <div className="mt-3" style={{ maxWidth: "400px", width: "90%" }}>
        {showCard ? (
          <Card
            card={card as CardType}
            isSelected={false}
            actionButton={
              <Button
                className="d-flex align-items-center gap-2 mt-4"
                style={{ paddingLeft: "12px" }}
                variant="contained"
                onClick={() => setShowCard(false)}
              >
                <VisibilityOffIcon /> Ukryj
              </Button>
            }
          />
        ) : (
          <div
            className="role-card justify-content-center"
            style={{ height: "140px" }}
          >
            <Button
              className="d-flex align-items-center gap-2"
              style={{ paddingLeft: "12px" }}
              variant="contained"
              onClick={() => setShowCard(true)}
            >
              <VisibilityIcon className="mr-2" /> Pokaż
            </Button>
          </div>
        )}
      </div>
      <DropdownSection inGameCards={inGameCards} />
    </>
  );
};

export default PlayerGameView;

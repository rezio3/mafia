import { useState } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header";
import { cards, type CardType } from "../../utils/cards";
import DropdownSection from "./Dropdowns/DropdownSection";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonCustom from "../../components/Button";

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
              <div className="mt-4">
                <ButtonCustom
                  variant="contained"
                  onClick={() => setShowCard(false)}
                >
                  <VisibilityOffIcon /> Ukryj
                </ButtonCustom>
              </div>
            }
          />
        ) : (
          <div
            className="role-card justify-content-center"
            style={{ height: "140px" }}
          >
            <ButtonCustom variant="contained" onClick={() => setShowCard(true)}>
              <VisibilityIcon className="mr-2" /> Pokaż
            </ButtonCustom>
          </div>
        )}
      </div>
      <DropdownSection inGameCards={inGameCards} />
    </>
  );
};

export default PlayerGameView;

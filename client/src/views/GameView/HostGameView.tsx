import { Typography } from "@mui/material";
import type { Player } from "../../utils/types";
import { cards, type CardType } from "../../utils/cards";
import Header from "../../components/Header";
import Card from "../../components/Card";

type HostGameViewPropsType = {
  players: Player[];
};

const HostGameView: React.FC<HostGameViewPropsType> = ({ players }) => {
  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {players.length === 0 && <Typography>Brak graczy</Typography>}
      {players.map((player) => {
        const card = cards.find((card) => card.name === player.role);

        if (!card) {
          return <Header variant="h6">Nie znaleziono karty</Header>;
        }
        return (
          <>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "300px" }}
            >
              <Typography>{player.nickname}</Typography>
              <div style={{ width: "100px" }}>
                <Card card={card as CardType} isSmall />
              </div>
            </div>
            <div className="divider" />
          </>
        );
      })}
    </div>
  );
};

export default HostGameView;

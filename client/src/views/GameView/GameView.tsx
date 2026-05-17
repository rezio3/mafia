import { Button } from "@mui/material";
import Wrapper from "../../components/Wrapper";
import type { Player } from "../../utils/types";
import PlayerGameView from "./PlayerGameView";
import HostGameView from "./HostGameView";

type GameViewPropsType = {
  isHost: boolean;
  players: Player[];
  handleLeaveRoom: () => void;
};

const GameView: React.FC<GameViewPropsType> = ({
  isHost,
  players,
  handleLeaveRoom,
}) => {
  const currentPlayerId = localStorage.getItem("userId");
  const player = players.find((player) => player.id === currentPlayerId);

  const currentPlayerCard = player?.role;
  return (
    <Wrapper>
      <Button
        onClick={handleLeaveRoom}
        variant="contained"
        color="secondary"
        className="mb-3"
      >
        Wyjdź z pokoju
      </Button>
      {isHost ? (
        <HostGameView players={players} />
      ) : (
        <PlayerGameView
          playerCardName={currentPlayerCard}
          playerName={player?.nickname}
        />
      )}
    </Wrapper>
  );
};

export default GameView;

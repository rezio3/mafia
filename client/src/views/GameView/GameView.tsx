import { Button } from "@mui/material";
import Wrapper from "../../components/Wrapper";
import type { Player } from "../../utils/types";
import PlayerGameView from "./PlayerGameView";
import HostGameView from "./HostGameView";
import { useState } from "react";
import ConfirmationModal from "../../components/ConfirmationModal";

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
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const currentPlayerId = localStorage.getItem("userId");
  const player = players.find((player) => player.id === currentPlayerId);

  const currentPlayerCard = player?.role;

  const confirmToLeaveHandler = () => {
    handleLeaveRoom();
  };
  return (
    <>
      <Wrapper className="mt-5">
        <Button
          onClick={() => setIsConfirmationModalOpen(true)}
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
      <ConfirmationModal
        handleClose={() => setIsConfirmationModalOpen(false)}
        open={isConfirmationModalOpen}
        onConfirm={confirmToLeaveHandler}
      />
    </>
  );
};

export default GameView;

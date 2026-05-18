import { Button, Typography } from "@mui/material";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import type { Player } from "../utils/types";
import CardsSelection from "../components/CardsSelection";
import socket from "../socket";
import ConfirmationModal from "../components/ConfirmationModal";
import { useState } from "react";

type RoomLobbyPropsType = {
  roomCode: string;
  players: Player[];
  isHost: boolean;
  handleLeaveRoom: () => void;
  selectedCards: string[];
};

const RoomLobby: React.FC<RoomLobbyPropsType> = ({
  roomCode,
  players,
  isHost,
  handleLeaveRoom,
  selectedCards,
}) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const currentPlayerId = localStorage.getItem("userId");
  const handleStartGame = () => {
    if (selectedCards.length === players.length && isHost) {
      console.log("rozpoczynam gre");
      socket.emit("start_game", { roomCode });
    } else {
      console.log("Liczba kart musi być taka sama jak liczba graczy.");
    }
  };

  const confirmToLeaveHandler = () => {
    handleLeaveRoom();
  };

  return (
    <>
      <Wrapper>
        <div className="d-flex flex-column align-items-center gap-1">
          {isHost && (
            <Typography variant="h6" color="primary">
              Jesteś prowadzącym
            </Typography>
          )}
          <Header variant="h4">Twój pokój: {roomCode}</Header>
          <Button
            onClick={() => setIsConfirmationModalOpen(true)}
            variant="contained"
            color="secondary"
          >
            Wyjdź z pokoju
          </Button>
          <div className="mt-2" />
          <Header variant="h6">Liczba graczy: {players.length}</Header>
          <div className="d-flex flex-column w-100 bg-player-list">
            {players.length < 1
              ? "Trochę tu pusto..."
              : players.map((player: Player, index) => (
                  <Typography
                    color={
                      player.id === currentPlayerId ? "primary" : "secondary"
                    }
                    key={player.id}
                  >
                    {index + 1}. {player.nickname}
                  </Typography>
                ))}
          </div>
          {isHost && (
            <Button
              variant="contained"
              className="mt-3"
              onClick={handleStartGame}
            >
              Rozpocznij grę
            </Button>
          )}
          <CardsSelection
            selectedCards={selectedCards}
            isHost={isHost}
            roomCode={roomCode}
          />
        </div>
      </Wrapper>
      <ConfirmationModal
        handleClose={() => setIsConfirmationModalOpen(false)}
        open={isConfirmationModalOpen}
        onConfirm={confirmToLeaveHandler}
      />
    </>
  );
};

export default RoomLobby;

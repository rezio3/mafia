import { Button, Typography } from "@mui/material";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import type { Player } from "../utils/types";
import CardsSelection from "../components/CardsSelection";

type RoomLobbyPropsType = {
  roomCode: string;
  players: Player[];
  isHost: boolean;
  handleLeaveRoom: () => void;
};

const RoomLobby: React.FC<RoomLobbyPropsType> = ({
  roomCode,
  players,
  isHost,
  handleLeaveRoom,
}) => {
  console.log(isHost);
  console.log(players);

  const currentPlayerId = localStorage.getItem("userId");

  return (
    <Wrapper>
      <div className="d-flex flex-column align-items-center gap-1">
        {isHost && (
          <Typography variant="h6" color="primary">
            Jesteś prowadzącym
          </Typography>
        )}
        <Header variant="h4">Twój pokój: {roomCode}</Header>
        <Button onClick={handleLeaveRoom} variant="contained" color="secondary">
          Wyjdź z pokoju
        </Button>
        <div className="mt-2" />
        <Header variant="h6">Liczba graczy: {players.length}</Header>
        <div className="d-flex flex-column w-100 bg-player-list">
          {players.length < 1
            ? "---"
            : players.map((player: Player, index) => (
                <Typography
                  color={
                    player.id === currentPlayerId ? "primary" : "secondary"
                  }
                >
                  {index + 1}. {player.nickname}
                </Typography>
              ))}
        </div>
        <CardsSelection />
      </div>
    </Wrapper>
  );
};

export default RoomLobby;

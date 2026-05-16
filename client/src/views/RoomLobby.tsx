import { Button, Typography } from "@mui/material";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import type { Player } from "../utils/types";

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
        <Header variant="h4">Twój pokój: {roomCode}</Header>
        <Button onClick={handleLeaveRoom} variant="contained" color="secondary">
          Wyjdź z pokoju
        </Button>
        <div className="mt-2" />
        <Header variant="h6">Liczba graczy: {players.length}</Header>
        <div className="d-flex flex-column w-100 bg-card">
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
      </div>
    </Wrapper>
  );
};

export default RoomLobby;

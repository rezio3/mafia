import { Button } from "@mui/material";
import Header from "../components/Header";
import Wrapper from "../components/Wrapper";
import type { Player } from "../utils/types";

type RoomLobbyPropsType = {
  roomCode: string;
  players: Player[];
  isHost: boolean;
  currentPlayer: Player;
  handleLeaveRoom: () => void;
};

const RoomLobby: React.FC<RoomLobbyPropsType> = ({
  roomCode,
  players,
  isHost,
  currentPlayer,
  handleLeaveRoom,
}) => {
  console.log(isHost);
  console.log(players);
  console.log(currentPlayer);
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
                <span>
                  {index + 1}. {player.nickname}
                </span>
              ))}
        </div>
      </div>
    </Wrapper>
  );
};

export default RoomLobby;

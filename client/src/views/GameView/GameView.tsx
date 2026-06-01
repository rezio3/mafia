import Wrapper from "../../components/Wrapper/Wrapper";
import type { ChatType, Player } from "../../utils/types";
import PlayerGameView from "./PlayerGameView";
import HostGameView from "./HostGameView";
import { cards, type CardType } from "../../utils/cards";
import LeaveRoomButton from "../../components/LeaveRoomButton/LeaveRoomButton";

type GameViewPropsType = {
  isHost: boolean;
  players: Player[];
  handleLeaveRoom: () => void;
  chats: ChatType[];
  roomCode: string;
};

const GameView: React.FC<GameViewPropsType> = ({
  isHost,
  players,
  handleLeaveRoom,
  chats,
  roomCode,
}) => {
  const currentPlayerId = localStorage.getItem("userId");
  const player = players.find((player) => player.id === currentPlayerId);
  const inGameCards: CardType[] = cards.filter((card) =>
    players.some((player) => player.role === card.name),
  );

  const currentPlayerCard = player?.role;

  return (
    <>
      <Wrapper className="mt-5">
        <LeaveRoomButton handleLeaveRoom={handleLeaveRoom} />
        {isHost ? (
          <HostGameView players={players} chats={chats} roomCode={roomCode} />
        ) : (
          <PlayerGameView
            playerCardName={currentPlayerCard}
            playerName={player?.nickname}
            inGameCards={inGameCards}
            chats={chats}
            roomCode={roomCode}
          />
        )}
      </Wrapper>
    </>
  );
};

export default GameView;

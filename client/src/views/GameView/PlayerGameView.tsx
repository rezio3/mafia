import { useEffect, useRef, useState } from "react";
import Card from "../../components/Card/Card";
import Header from "../../components/Header";
import { cards, type CardType } from "../../utils/cards";
import DropdownSection from "./Dropdowns/DropdownSection";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ButtonCustom from "../../components/Button";
import ChatTrigger from "../../components/ChatComponents/ChatTrigger";
import { ChatModal } from "../../components/ChatComponents/ChatModal";
import type { ChatType } from "../../utils/types";

type PlayerGameViewPropsType = {
  playerCardName: string | undefined | null;
  playerName: string | undefined | null;
  inGameCards: CardType[];
  chats: ChatType[];
  roomCode: string;
};

const PlayerGameView: React.FC<PlayerGameViewPropsType> = ({
  playerCardName,
  playerName,
  inGameCards,
  chats,
  roomCode,
}) => {
  const [showCard, setShowCard] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const currentPlayerId = localStorage.getItem("userId");

  const myChat = chats.find((chat) => chat.userChatId === currentPlayerId);
  const currentMessagesLength = myChat ? myChat.messages.length : 0;

  const prevMessagesLengthRef = useRef(0);

  useEffect(() => {
    if (currentMessagesLength > prevMessagesLengthRef.current) {
      if (!isChatModalOpen) {
        setHasNewMessage(true);
      }
    }

    prevMessagesLengthRef.current = currentMessagesLength;
  }, [chats, isChatModalOpen, currentMessagesLength]);

  const handleOpenChat = () => {
    setIsChatModalOpen(true);
    setHasNewMessage(false);
  };

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
      <ChatTrigger openChat={handleOpenChat} newMessage={hasNewMessage} />
      {isChatModalOpen && (
        <ChatModal
          isChatModalOpen={isChatModalOpen}
          setIsChatModalOpen={setIsChatModalOpen}
          chatId={currentPlayerId!}
          chats={chats}
          roomCode={roomCode}
          playerNameToChat="prowadzącym"
        />
      )}
    </>
  );
};

export default PlayerGameView;

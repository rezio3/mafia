import { Typography } from "@mui/material";
import type { ChatType, Player } from "../../utils/types";
import { cards, type CardType } from "../../utils/cards";
import Header from "../../components/Header";
import Card from "../../components/Card/Card";
import ChatTrigger from "../../components/ChatComponents/ChatTrigger";
import React, { useEffect, useRef, useState } from "react";
import { ChatModal } from "../../components/ChatComponents/ChatModal";

type HostGameViewPropsType = {
  players: Player[];
  chats: ChatType[];
  roomCode: string;
};

const HostGameView: React.FC<HostGameViewPropsType> = ({
  players,
  chats,
  roomCode,
}) => {
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [userIdToChat, setUserIdToChat] = useState("");
  const [playerNameToChat, setPlayerNameToChat] = useState("");
  const [unreadChats, setUnreadChats] = useState<Record<string, boolean>>({});

  const prevChatsRef = useRef<ChatType[]>([]);

  useEffect(() => {
    chats.forEach((currentChat) => {
      const prevChat = prevChatsRef.current.find(
        (c) => c.userChatId === currentChat.userChatId,
      );

      const currentLength = currentChat.messages.length;
      const prevLength = prevChat ? prevChat.messages.length : 0;

      if (currentLength > prevLength) {
        const isCurrentWindowOpen =
          isChatModalOpen && userIdToChat === currentChat.userChatId;

        if (!isCurrentWindowOpen) {
          setUnreadChats((prev) => ({
            ...prev,
            [currentChat.userChatId]: true,
          }));
        }
      }
    });

    prevChatsRef.current = chats;
  }, [chats, isChatModalOpen, userIdToChat]);

  const handleOpenChat = (playerId: string, nickname: string) => {
    setIsChatModalOpen(true);
    setUserIdToChat(playerId);
    setPlayerNameToChat(nickname);

    setUnreadChats((prev) => ({
      ...prev,
      [playerId]: false,
    }));
  };

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      {players.length === 0 && <Typography>Brak graczy</Typography>}
      {players.map((player) => {
        const card = cards.find((card) => card.name === player.role);
        if (!card) {
          return <Header variant="h6">Nie znaleziono karty</Header>;
        }
        const hasNewMessage = !!unreadChats[player.id];
        return (
          <React.Fragment key={player.id}>
            <div
              className="d-flex justify-content-between align-items-center"
              style={{ width: "300px" }}
            >
              <Typography>{player.nickname}</Typography>
              <div style={{ width: "100px", position: "relative" }}>
                <Card card={card as CardType} isSmall />
                <div style={{ position: "absolute", top: -10, right: -30 }}>
                  <ChatTrigger
                    openChat={() => {
                      handleOpenChat(player.id, player.nickname);
                    }}
                    small
                    newMessage={hasNewMessage}
                  />
                </div>
              </div>
            </div>
            <div className="divider" />
          </React.Fragment>
        );
      })}
      {isChatModalOpen && (
        <ChatModal
          isChatModalOpen={isChatModalOpen}
          setIsChatModalOpen={setIsChatModalOpen}
          chatId={userIdToChat}
          chats={chats}
          roomCode={roomCode}
          playerNameToChat={playerNameToChat}
        />
      )}
    </div>
  );
};

export default HostGameView;

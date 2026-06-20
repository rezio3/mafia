import { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import SentMessageBox from "./SentMessageBox";
import ReceiveMessageBox from "./ReceiveMessageBox";
import CloseIcon from "@mui/icons-material/Close";
import { TextField, Typography } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import type { ChatType } from "../../utils/types";
import socket from "../../socket";

type ChatModalPropsType = {
  isChatModalOpen: boolean;
  setIsChatModalOpen: (value: boolean) => void;
  chatId: string;
  chats: ChatType[];
  roomCode: string;
  playerNameToChat: string;
};

export const ChatModal: React.FC<ChatModalPropsType> = ({
  isChatModalOpen,
  setIsChatModalOpen,
  chatId,
  chats,
  roomCode,
  playerNameToChat,
}) => {
  const [messageInputValue, setMessageInputValue] = useState("");

  const isHost = localStorage.getItem("isHost") === "true";
  const currentUserId = localStorage.getItem("userId") || "";

  const activeChat = chats.find((chat: ChatType) => chat.userChatId === chatId);
  const messages = activeChat ? activeChat.messages : [];

  const handleSendMessage = () => {
    if (!messageInputValue.trim()) return;
    const recipientId = isHost ? chatId : "host";

    socket.emit("send_chat_message", {
      roomCode,
      senderId: currentUserId,
      recipientId,
      message: messageInputValue.trim(),
    });

    setMessageInputValue("");
  };

  const handleClose = () => {
    setIsChatModalOpen(false);
  };

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isChatModalOpen) {
      setTimeout(() => {
        if (scrollContainerRef.current) {
          const container = scrollContainerRef.current;

          container.scrollTop = container.scrollHeight;
        }
      }, 0);
    }
  }, [isChatModalOpen]);

  return (
    <>
      <Dialog
        open={isChatModalOpen}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
        fullWidth={true}
      >
        <DialogTitle
          id="scroll-dialog-title"
          className="d-flex justify-content-between"
        >
          Chat z {playerNameToChat}
          <div style={{ cursor: "pointer" }} onClick={handleClose}>
            <CloseIcon />
          </div>
        </DialogTitle>

        <DialogContent dividers={true} ref={scrollContainerRef}>
          <DialogContentText
            component="div"
            id="scroll-dialog-description"
            tabIndex={-1}
            className="d-flex flex-column align-items-start gap-2"
          >
            {messages.length === 0 ? (
              <div className="w-100 d-flex justify-content-center">
                <Typography>Brak wiadomości.</Typography>
              </div>
            ) : (
              messages.map((msg, index) => {
                const isMyMessage = isHost
                  ? msg.sender === "host"
                  : msg.sender === "player";

                return isMyMessage ? (
                  <ReceiveMessageBox text={msg.message} key={index} />
                ) : (
                  <SentMessageBox text={msg.message} key={index} />
                );
              })
            )}
          </DialogContentText>
        </DialogContent>
        <DialogActions className="d-flex justify-content-between">
          <div className="flex-grow-1">
            <TextField
              size="small"
              className="w-100"
              onChange={(e) => setMessageInputValue(e.target.value)}
              value={messageInputValue}
            />
          </div>
          <Button
            variant="contained"
            style={{ height: "auto" }}
            onClick={handleSendMessage}
          >
            <SendIcon sx={{ fontSize: 18 }} style={{ marginRight: "4px" }} />{" "}
            Wyślij
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

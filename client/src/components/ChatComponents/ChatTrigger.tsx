import ChatIcon from "@mui/icons-material/Chat";
import "./chat.scss";

type ChatTriggerPropsType = {
  openChat: () => void;
  newMessage: boolean;
  small?: boolean;
};

const ChatTrigger: React.FC<ChatTriggerPropsType> = ({
  openChat,
  newMessage,
  small,
}) => {
  return (
    <div
      className={`chat-button ${newMessage ? "chat-button-new-message" : ""}`}
      style={{ cursor: "pointer", marginTop: small ? undefined : "40px" }}
      onClick={openChat}
    >
      <ChatIcon sx={{ fontSize: small ? 30 : 50 }} />
    </div>
  );
};

export default ChatTrigger;

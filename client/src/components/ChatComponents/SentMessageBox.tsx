import { Typography } from "@mui/material";
import "./chat.scss";

type SentMessageBoxPropsType = {
  text: string;
};

const SentMessageBox: React.FC<SentMessageBoxPropsType> = ({ text }) => {
  return (
    <div className="sent-message-box">
      <Typography>{text}</Typography>
    </div>
  );
};

export default SentMessageBox;

import { Typography } from "@mui/material";
import "./chat.scss";

type ReceiveMessageBoxPropsType = {
  text: string;
};

const ReceiveMessageBox: React.FC<ReceiveMessageBoxPropsType> = ({ text }) => {
  return (
    <div className="receive-message-box">
      <Typography>{text}</Typography>
    </div>
  );
};

export default ReceiveMessageBox;

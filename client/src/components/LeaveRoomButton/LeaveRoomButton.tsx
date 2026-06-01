import { useState } from "react";
import ButtonCustom from "../Button";
import ConfirmationModal from "../ConfirmationModal";
import LogoutIcon from "@mui/icons-material/Logout";

type LeaveRoomButtonPropsType = {
  handleLeaveRoom: () => void;
};

const LeaveRoomButton: React.FC<LeaveRoomButtonPropsType> = ({
  handleLeaveRoom,
}) => {
  const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
  const confirmToLeaveHandler = () => {
    handleLeaveRoom();
  };
  return (
    <>
      <ButtonCustom
        variant="contained"
        onClick={() => setIsConfirmationModalOpen(true)}
        className="mb-3"
        color="secondary"
      >
        <LogoutIcon />
        Wyjdź z pokoju
      </ButtonCustom>
      <ConfirmationModal
        handleClose={() => setIsConfirmationModalOpen(false)}
        open={isConfirmationModalOpen}
        onConfirm={confirmToLeaveHandler}
      />
    </>
  );
};

export default LeaveRoomButton;

import { Button, TextField, Typography } from "@mui/material";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import PersonIcon from "@mui/icons-material/Person";
import TagIcon from "@mui/icons-material/Tag";
import LoginIcon from "@mui/icons-material/Login";

type MainMenuPropsType = {
  createRoomOnClick: () => void;
  joinRoomOnClick: (code: string, nickname: string) => void;
};

const MainMenu: React.FC<MainMenuPropsType> = ({
  createRoomOnClick,
  joinRoomOnClick,
}) => {
  const [inputCode, setInputCode] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState({ inputCodeError: "", nicknameError: "" });

  const handleJoinRoomButton = () => {
    let nicknameError = "";
    let inputCodeError = "";
    if (nickname === "") {
      nicknameError = "Wprowadź swój nick";
    }
    if (inputCode === "") {
      inputCodeError = "Wprowadź kod pokoju";
    }
    setError({ inputCodeError: inputCodeError, nicknameError: nicknameError });

    if (inputCode && nickname) {
      joinRoomOnClick(inputCode, nickname);
    }
  };

  return (
    <Wrapper>
      <div className="d-flex flex-column align-items-center gap-1 mt-5">
        <Header variant="h1" className="main-header">
          MAFIA
        </Header>
        <Typography className="mb-4 text-gray">
          Zdrada. Kłamstwo. Przeżycie.
        </Typography>
        <Button
          onClick={createRoomOnClick}
          variant="contained"
          color="primary"
          className="d-flex align-items-center gap-1"
          style={{ paddingLeft: "8px" }}
        >
          <AddIcon /> Stwórz pokój
        </Button>
        <div className="mb-5 mt-5" />
        <Header
          variant="h5"
          className="mt-4 d-flex align-items-center text-center"
        >
          <div className="decoration-white-line" />
          Dołącz do pokoju <div className="decoration-white-line" />
        </Header>
        <TextField
          label={
            <div className="d-flex align-items-center">
              <PersonIcon className="me-1" />
              <span>Twój Nick</span>
            </div>
          }
          variant="outlined"
          onChange={(e) => {
            setError({ ...error, nicknameError: "" });
            setNickname(e.target.value);
          }}
          error={!!error.nicknameError}
          helperText={error.nicknameError}
        />
        <TextField
          className="mt-2"
          label={
            <div className="d-flex align-items-center">
              <TagIcon className="me-1" />
              <span>Kod pokoju</span>
            </div>
          }
          variant="outlined"
          onChange={(e) => {
            setError({ ...error, inputCodeError: "" });
            setInputCode(e.target.value.toUpperCase());
          }}
          error={!!error.inputCodeError}
          helperText={error.inputCodeError}
        />
        <div className="mt-2" />
        <Button
          onClick={handleJoinRoomButton}
          variant="contained"
          color="primary"
          className="d-flex align-items-center gap-2"
          style={{ paddingLeft: "8px" }}
        >
          <LoginIcon /> Dołącz
        </Button>
      </div>
    </Wrapper>
  );
};

export default MainMenu;

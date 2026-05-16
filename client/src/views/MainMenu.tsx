import { Button, TextField } from "@mui/material";
import Wrapper from "../components/Wrapper";
import Header from "../components/Header";
import { useState } from "react";

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
      <div className="d-flex flex-column align-items-center gap-1">
        <Header variant="h1">Mafia</Header>
        <Button onClick={createRoomOnClick} variant="contained" color="primary">
          Stwórz pokój
        </Button>
        <div className="mb-5" />
        <Header variant="h5">Dołącz do pokoju</Header>
        <TextField
          label="Twój Nick"
          variant="outlined"
          onChange={(e) => {
            setError({ ...error, nicknameError: "" });
            setNickname(e.target.value);
          }}
          error={!!error.nicknameError}
          helperText={error.nicknameError}
        />
        <TextField
          label="Kod"
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
        >
          Dołącz
        </Button>
      </div>
    </Wrapper>
  );
};

export default MainMenu;

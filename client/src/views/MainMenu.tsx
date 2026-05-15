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
          onChange={(e) => setNickname(e.target.value)}
        />
        <TextField
          label="Kod"
          variant="outlined"
          onChange={(e) => setInputCode(e.target.value.toUpperCase())}
        />
        <div className="mt-2" />
        <Button
          onClick={() => joinRoomOnClick(inputCode, nickname)}
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

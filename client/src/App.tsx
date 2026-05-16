import { useEffect, useState } from "react";
import "./global.scss";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/ThemeProvider";
import MainMenu from "./views/MainMenu";
import socket from "./socket";
import RoomLobby from "./views/RoomLobby";
import type { Player } from "./utils/types";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);

  const userId = localStorage.getItem("userId") || uuidv4();
  localStorage.setItem("userId", userId);

  const handleCreateRoom = () => {
    socket.emit("create_room", { userId });
  };

  const handleJoinRoom = (code: string, nickname: string) => {
    socket.emit("join_room", { roomCode: code, nickname, userId });
  };

  const handleLeaveRoom = () => {
    if (roomCode) {
      socket.emit("leave_room", { roomCode, userId });
    }
    localStorage.clear();

    setRoomCode(null);
    setPlayers([]);
    setIsHost(false);

    window.location.reload();
  };

  useEffect(() => {
    socket.on("room_created", (code) => {
      setRoomCode(code);
      setIsHost(true);
      localStorage.setItem("roomCode", code);
      localStorage.setItem("isHost", "true");
    });

    socket.on("join_success", ({ roomCode, nickname, isHost }) => {
      setRoomCode(roomCode);
      setIsHost(isHost || false);
      localStorage.setItem("roomCode", roomCode);
      if (nickname) localStorage.setItem("nickname", nickname);
    });

    socket.on("rejoin_failed", () => {
      localStorage.clear();
      setRoomCode(null);
    });

    socket.on("update_players", (playersList) => {
      setPlayers(playersList);
    });

    const savedRoomCode = localStorage.getItem("roomCode");
    const savedNickname = localStorage.getItem("nickname");

    if (savedRoomCode) {
      socket.emit("rejoin_room", {
        roomCode: savedRoomCode,
        userId,
        nickname: savedNickname,
      });
    }

    socket.on("room_destroyed", (message) => {
      alert(message);
      localStorage.clear();
      setRoomCode(null);
      setPlayers([]);
      setIsHost(false);
    });
    socket.on("error", (msg) => {
      alert(msg);
      window.location.reload();
    });

    return () => {
      socket.off("room_created");
      socket.off("update_players");
      socket.off("join_success");
      socket.off("rejoin_failed");
      socket.off("room_destroyed");
      socket.off("error");
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {!roomCode ? (
        <MainMenu
          createRoomOnClick={handleCreateRoom}
          joinRoomOnClick={handleJoinRoom}
        />
      ) : (
        <RoomLobby
          roomCode={roomCode}
          players={players}
          isHost={isHost}
          handleLeaveRoom={handleLeaveRoom}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./global.scss";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/ThemeProvider";
import MainMenu from "./views/MainMenu";
import socket from "./socket";
import RoomLobby from "./views/RoomLobby";
import { userId } from "./utils/uuidGenerator";
import type { Player } from "./utils/types";

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [currentPlayer, setCurrentPlayer] = useState<any>(null);

  const handleCreateRoom = () => {
    socket.emit("create_room", { userId }); // Wysyłamy userId hosta!
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
    setCurrentPlayer(null);

    window.location.reload();
  };

  useEffect(() => {
    // 1. NAJPIERW USTAWIAMY NASŁUCHIWANIE
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
      const me = playersList.find((p: any) => p.id === userId);
      if (me) setCurrentPlayer(me);
    });

    // 2. DOPIERO NA KOŃCU ROBIMY REJOIN
    const savedRoomCode = localStorage.getItem("roomCode");
    const savedNickname = localStorage.getItem("nickname");

    if (savedRoomCode) {
      socket.emit("rejoin_room", {
        roomCode: savedRoomCode,
        userId,
        nickname: savedNickname,
      });
    }

    return () => {
      socket.off("room_created");
      socket.off("update_players");
      socket.off("join_success");
      socket.off("rejoin_failed");
    };
  }, []);

  useEffect(() => {
    console.log(roomCode);
  }, [roomCode]);

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
          currentPlayer={currentPlayer}
          handleLeaveRoom={handleLeaveRoom}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

import { useEffect, useState } from "react";
import "./global.scss";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/ThemeProvider";
import MainMenu from "./views/MainMenu";
import socket from "./socket";
import RoomLobby from "./views/RoomLobby";
import type { Player } from "./utils/types";
import { v4 as uuidv4 } from "uuid";
import GameView from "./views/GameView/GameView";

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);

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
    setGameStarted(false);

    window.location.reload();
  };

  useEffect(() => {
    socket.on("room_created", (code) => {
      setRoomCode(code);
      setIsHost(true);
      localStorage.setItem("roomCode", code);
      localStorage.setItem("isHost", "true");
    });

    socket.on(
      "join_success",
      ({ roomCode, nickname, isHost, gameStarted: roomGameStarted }) => {
        setRoomCode(roomCode);
        setIsHost(isHost || false);
        if (roomGameStarted) setGameStarted(roomGameStarted);
        localStorage.setItem("roomCode", roomCode);
        if (nickname) localStorage.setItem("nickname", nickname);
      },
    );

    socket.on("rejoin_failed", () => {
      localStorage.clear();
      setRoomCode(null);
    });

    socket.on("update_players", (playersList) => {
      setPlayers(playersList);
    });

    const savedRoomCode = localStorage.getItem("roomCode");
    const savedNickname = localStorage.getItem("nickname");

    socket.on("update_selected_cards", (cardsList: string[]) => {
      setSelectedCards(cardsList);
    });

    socket.on("game_started", ({ gameStarted, players: updatedPlayers }) => {
      setPlayers(updatedPlayers);
      setGameStarted(gameStarted);
    });

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
      setGameStarted(false);
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
      socket.off("update_selected_cards");
      socket.off("game_started");
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {!roomCode ? (
        <MainMenu
          createRoomOnClick={handleCreateRoom}
          joinRoomOnClick={handleJoinRoom}
        />
      ) : gameStarted ? (
        <GameView
          isHost={isHost}
          players={players}
          handleLeaveRoom={handleLeaveRoom}
        />
      ) : (
        <RoomLobby
          roomCode={roomCode}
          players={players}
          isHost={isHost}
          handleLeaveRoom={handleLeaveRoom}
          selectedCards={selectedCards}
        />
      )}
    </ThemeProvider>
  );
}

export default App;

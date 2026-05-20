import { useEffect, useState } from "react";
import "./style/global.scss";
import "./style/background.scss";
import "./style/loading.scss";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/ThemeProvider";
import MainMenu from "./views/MainMenu";
import socket from "./socket";
import RoomLobby from "./views/RoomLobby";
import type { Player } from "./utils/types";
import { v4 as uuidv4 } from "uuid";
import GameView from "./views/GameView/GameView";
import Footer from "./components/Footer/Footer";
import { CircularProgress } from "@mui/material";
import Header from "./components/Header";

function App() {
  const [roomCode, setRoomCode] = useState(null);
  const [players, setPlayers] = useState<Player[]>([]);
  const [isHost, setIsHost] = useState(false);
  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [isLoading, setIsLoading] = useState(() => {
    return !!localStorage.getItem("roomCode");
  });

  const userId = localStorage.getItem("userId") || uuidv4();
  localStorage.setItem("userId", userId);

  const handleCreateRoom = () => {
    setIsLoading(true);
    socket.emit("create_room", { userId });
  };

  const handleJoinRoom = (code: string, nickname: string) => {
    setIsLoading(true);
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
      setIsLoading(false);
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
        setIsLoading(false);
      },
    );

    socket.on("rejoin_failed", () => {
      localStorage.clear();
      setRoomCode(null);
      setIsLoading(false);
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
      <div className="app-wrapper">
        <div className="background-illustration" />
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
        <Footer />
        {isLoading && (
          <div className="full-screen-loader">
            <div className="loader-content">
              <CircularProgress color="primary" size={60} />
              <Header variant="h5" className="mt-3">
                ŁĄCZENIE Z POKOJEM...
              </Header>
            </div>
          </div>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;

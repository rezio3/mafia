import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { Player } from "../utils/types";
import socket from "../socket";

export const useGameSocket = () => {
  const [roomCode, setRoomCode] = useState<string | null>(null);
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
    setSelectedCards([]);
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
      setSelectedCards([]);
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
      setSelectedCards([]);
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
  }, [userId]);

  // Wystawiamy stany i metody na zewnątrz dla komponentu App.tsx
  return {
    roomCode,
    players,
    isHost,
    selectedCards,
    gameStarted,
    isLoading,
    handleCreateRoom,
    handleJoinRoom,
    handleLeaveRoom,
  };
};

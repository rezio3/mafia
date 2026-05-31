import { Server, Socket } from "socket.io";
import type { Rooms } from "../types/game.js";

// Nasza "baza danych" w RAM, teraz z oficjalnym typem!
const rooms: Rooms = {};

export const registerRoomHandlers = (io: Server, socket: Socket) => {
  // Tworzenie pokoju
  socket.on("create_room", ({ userId }: { userId: string }) => {
    const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    rooms[roomCode] = {
      hostSocketId: socket.id,
      hostUserId: userId,
      players: [],
      gameStarted: false,
    };
    socket.join(roomCode);
    socket.emit("room_created", roomCode);
  });

  // Dołączanie do pokoju
  socket.on(
    "join_room",
    ({
      roomCode,
      nickname,
      userId,
    }: {
      roomCode: string;
      nickname: string;
      userId: string;
    }) => {
      const room = rooms[roomCode];
      if (!room) return socket.emit("error", "Pokój nie istnieje!");

      const existingPlayer = room.players.find((p) => p.id === userId);

      if (!existingPlayer) {
        room.players.push({
          id: userId,
          socketId: socket.id,
          nickname,
          role: null,
        });
      } else {
        existingPlayer.socketId = socket.id;
      }

      socket.join(roomCode);
      io.to(roomCode).emit("update_players", room.players);
      socket.emit("update_selected_cards", room.selectedCards || []);
      socket.emit("join_success", { roomCode, nickname, isHost: false });
      console.log(
        "AKTUALNY STAN BAZY (ROOMS):",
        JSON.stringify(rooms, null, 2),
      );
    },
  );

  // Wychodzenie z pokoju
  socket.on(
    "leave_room",
    ({ roomCode, userId }: { roomCode: string; userId: string }) => {
      if (rooms[roomCode]) {
        if (rooms[roomCode].hostUserId === userId) {
          io.to(roomCode).emit("room_destroyed", "Prowadzący zamknął pokój.");
          delete rooms[roomCode];
          console.log(`Pokój ${roomCode} usunięty przez Hosta.`);
        } else {
          rooms[roomCode].players = rooms[roomCode].players.filter(
            (p) => p.id !== userId,
          );
          io.to(roomCode).emit("update_players", rooms[roomCode].players);
        }
        socket.leave(roomCode);
      }
    },
  );

  // Rejoin (Powrót do pokoju)
  socket.on(
    "rejoin_room",
    ({
      roomCode,
      userId,
      nickname,
    }: {
      roomCode: string;
      userId: string;
      nickname: string | null;
    }) => {
      const room = rooms[roomCode];
      if (!room) return socket.emit("rejoin_failed");

      const isHost = room.hostUserId === userId;
      const player = room.players.find((p) => p.id === userId);

      if (player || isHost) {
        if (player) player.socketId = socket.id;
        if (isHost) room.hostSocketId = socket.id;

        socket.join(roomCode);

        const response: any = {
          roomCode,
          isHost,
          gameStarted: room.gameStarted,
        };
        if (player) response.nickname = player.nickname;

        socket.emit("update_selected_cards", room.selectedCards || []);
        socket.emit("join_success", response);
        io.to(roomCode).emit("update_players", room.players);
      } else {
        socket.emit("rejoin_failed");
      }
    },
  );

  // Wybór kart
  socket.on(
    "toggle_card",
    ({ roomCode, cardName }: { roomCode: string; cardName: string }) => {
      const room = rooms[roomCode];
      if (!room) return;

      if (!room.selectedCards) room.selectedCards = [];

      const index = room.selectedCards.indexOf(cardName);
      if (index === -1) {
        room.selectedCards.push(cardName);
      } else {
        room.selectedCards.splice(index, 1);
      }

      io.to(roomCode).emit("update_selected_cards", room.selectedCards);
      console.log(
        "AKTUALNY STAN BAZY (ROOMS):",
        JSON.stringify(rooms, null, 2),
      );
    },
  );

  // Start gry i losowanie ról
  socket.on("start_game", ({ roomCode }: { roomCode: string }) => {
    const room = rooms[roomCode];
    if (!room) return;

    const cardsToDistribute = [...(room.selectedCards || [])];

    for (let i = cardsToDistribute.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsToDistribute[i], cardsToDistribute[j]] = [
        cardsToDistribute[j]!,
        cardsToDistribute[i]!,
      ];
    }

    room.players.forEach((player, index) => {
      player.role = cardsToDistribute[index]!;
    });

    room.gameStarted = true;

    io.to(roomCode).emit("game_started", {
      gameStarted: room.gameStarted,
      players: room.players,
    });
  });
};

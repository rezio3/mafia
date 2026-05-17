const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

const rooms = {};

io.on("connection", (socket) => {
  console.log(`Połączenie: ${socket.id}`);

  socket.on("create_room", ({ userId }) => {
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

  socket.on("join_room", ({ roomCode, nickname, userId }) => {
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
    console.log("AKTUALNY STAN BAZY (ROOMS):", JSON.stringify(rooms, null, 2));
  });

  socket.on("leave_room", ({ roomCode, userId }) => {
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
  });

  socket.on("rejoin_room", ({ roomCode, userId }) => {
    const room = rooms[roomCode];
    if (!room) return socket.emit("rejoin_failed");

    const isHost = room.hostUserId === userId;
    const player = room.players.find((p) => p.id === userId);

    if (player || isHost) {
      if (player) player.socketId = socket.id;
      if (isHost) room.hostSocketId = socket.id;

      socket.join(roomCode);

      const response = { roomCode, isHost, gameStarted: room.gameStarted };
      if (player) response.nickname = player.nickname;

      socket.emit("update_selected_cards", room.selectedCards || []);
      socket.emit("join_success", response);
      io.to(roomCode).emit("update_players", room.players);
    } else {
      socket.emit("rejoin_failed");
    }
  });

  socket.on("toggle_card", ({ roomCode, cardName }) => {
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
    console.log("AKTUALNY STAN BAZY (ROOMS):", JSON.stringify(rooms, null, 2));
  });

  socket.on("start_game", ({ roomCode }) => {
    const room = rooms[roomCode];
    if (!room) return;

    const cardsToDistribute = [...(room.selectedCards || [])];

    for (let i = cardsToDistribute.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cardsToDistribute[i], cardsToDistribute[j]] = [
        cardsToDistribute[j],
        cardsToDistribute[i],
      ];
    }

    room.players.forEach((player, index) => {
      player.role = cardsToDistribute[index];
    });

    room.gameStarted = true;

    io.to(roomCode).emit("game_started", {
      gameStarted: room.gameStarted,
      players: room.players,
    });
  });

  socket.on("disconnect", () => console.log("Rozłączono"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Serwer śmiga na porcie ${PORT}`));

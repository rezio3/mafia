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
    socket.emit("join_success", { roomCode, nickname, isHost: false });
  });

  // 3. Wyjście z pokoju
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

      const response = { roomCode, isHost };
      if (player) response.nickname = player.nickname;

      socket.emit("join_success", response);
      io.to(roomCode).emit("update_players", room.players);
    } else {
      socket.emit("rejoin_failed");
    }
  });

  socket.on("disconnect", () => console.log("Rozłączono"));
});

const PORT = 3001;
server.listen(PORT, () => console.log(`Serwer śmiga na porcie ${PORT}`));

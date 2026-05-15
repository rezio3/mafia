const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // W produkcji zmienimy to na konkretny adres
    methods: ["GET", "POST"],
  },
});

// Nasza "baza danych" w pamięci RAM
const rooms = {};

io.on("connection", (socket) => {
  console.log(`Nowe połączenie: ${socket.id}`);

  // 1. Tworzenie pokoju przez Prowadzącego
  socket.on("create_room", ({ userId }) => {
    const roomCode = Math.random().toString(36).substring(2, 6).toUpperCase();
    rooms[roomCode] = {
      hostSocketId: socket.id,
      hostUserId: userId, // TO MUSI TU BYĆ
      players: [],
      gameStarted: false,
    };
    socket.join(roomCode);
    socket.emit("room_created", roomCode);
    console.log(`Pokój stworzony: ${roomCode} przez hosta: ${userId}`);
  });

  // 2. Dołączanie gracza do pokoju
  socket.on("join_room", ({ roomCode, nickname, userId }) => {
    const room = rooms[roomCode];

    if (room) {
      // Sprawdzamy czy gracz już tu jest (po userId)
      const existingPlayer = room.players.find((p) => p.id === userId);

      if (!existingPlayer) {
        const newPlayer = {
          id: userId,
          socketId: socket.id,
          nickname: nickname,
          role: null,
        };
        room.players.push(newPlayer);
      } else {
        // Jeśli wrócił, aktualizujemy mu tylko socketId
        existingPlayer.socketId = socket.id;
      }

      socket.join(roomCode);
      // Informujemy wszystkich w pokoju, że lista graczy się zmieniła
      io.to(roomCode).emit("update_players", room.players);
      socket.emit("join_success", { roomCode });
    } else {
      socket.emit("error", "Pokój nie istnieje!");
    }
  });

  socket.on("leave_room", ({ roomCode, userId }) => {
    if (rooms[roomCode]) {
      // Filtrujemy tablicę - zostawiamy tylko tych, którzy NIE mają tego userId
      rooms[roomCode].players = rooms[roomCode].players.filter(
        (p) => p.id !== userId,
      );

      // Informujemy resztę, że skład się zmienił
      io.to(roomCode).emit("update_players", rooms[roomCode].players);

      // Oficjalnie wyrzucamy socket z pokoju
      socket.leave(roomCode);

      console.log(`Gracz ${userId} opuścił pokój ${roomCode}`);
    }
  });

  socket.on("rejoin_room", ({ roomCode, userId, nickname }) => {
    const room = rooms[roomCode];

    if (room) {
      // Sprawdzamy czy powracający to host (porównujemy stałe userId!)
      const isHost = room.hostUserId === userId;
      const player = room.players.find((p) => p.id === userId);

      if (player || isHost) {
        // Przypisujemy nowy socket.id do starego userId
        if (player) player.socketId = socket.id;
        if (isHost) room.hostSocketId = socket.id;

        socket.join(roomCode);

        // Ważne: Wysyłamy info o sukcesie
        socket.emit("join_success", {
          roomCode,
          nickname: player ? player.nickname : "Prowadzący",
          isHost,
        });

        // Aktualizujemy listę wszystkim (żeby zniknęły duchy)
        io.to(roomCode).emit("update_players", room.players);
      } else {
        socket.emit("rejoin_failed");
      }
    } else {
      socket.emit("rejoin_failed");
    }
  });

  socket.on("disconnect", () => {
    console.log("Ktoś się rozłączył");
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Serwer śmiga na porcie ${PORT}`);
});

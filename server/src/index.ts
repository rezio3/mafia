import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { registerRoomHandlers } from "./handlers/roomHandler.js";

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] },
});

io.on("connection", (socket) => {
  console.log(`Połączenie: ${socket.id}`);

  // Rejestrujemy nasze wydzielone funkcje dla tego socketu
  registerRoomHandlers(io, socket);

  socket.on("disconnect", () => console.log("Rozłączono"));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => console.log(`Serwer śmiga na porcie ${PORT}`));

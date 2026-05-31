export interface Player {
  id: string;
  socketId: string;
  nickname: string;
  role: string | null;
}

export interface Room {
  hostSocketId: string;
  hostUserId: string;
  players: Player[];
  gameStarted: boolean;
  selectedCards?: string[];
}

export interface Rooms {
  [roomCode: string]: Room;
}

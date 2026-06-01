export interface Player {
  id: string;
  socketId: string;
  nickname: string;
  role: string | null;
}

export interface ChatMessage {
  sender: "host" | "player";
  message: string;
  timestamp: number; // warto dodać, żeby wiadomości się nie mieszały
}

export interface PlayerChat {
  userChatId: string; // To jest ID gracza, z którym prowadzona jest rozmowa
  messages: ChatMessage[];
}

export interface Room {
  hostSocketId: string;
  hostUserId: string;
  players: Player[];
  gameStarted: boolean;
  selectedCards?: string[];
  chats: PlayerChat[];
}

export interface Rooms {
  [roomCode: string]: Room;
}

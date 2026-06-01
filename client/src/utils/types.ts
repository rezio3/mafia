export type Player = {
  id: string;
  nickname: string;
  role: string | null;
  socketId: string;
};

type Message = {
  sender: "host" | "player";
  message: string;
};

export type ChatType = {
  userChatId: string;
  messages: Message[];
};

import { io } from "socket.io-client";
const socket = io("http://192.168.1.123:3001");
export default socket;

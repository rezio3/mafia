import { io } from "socket.io-client";
const socket = io("http://192.168.1.132:3001");
export default socket;

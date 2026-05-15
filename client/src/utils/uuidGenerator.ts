import { v4 as uuidv4 } from "uuid";

export const userId = localStorage.getItem("userId") || uuidv4();
localStorage.setItem("userId", userId);

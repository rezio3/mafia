import "./style/global.scss";
import "./style/background.scss";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./theme/ThemeProvider";
import MainMenu from "./views/MainMenu";
import RoomLobby from "./views/RoomLobby";
import GameView from "./views/GameView/GameView";
import Footer from "./components/Footer/Footer";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import { useGameSocket } from "./hooks/useGameSocket";
import AdBanner from "./components/AdBanner/AdBanner";

function App() {
  const {
    roomCode,
    players,
    isHost,
    selectedCards,
    gameStarted,
    isLoading,
    handleCreateRoom,
    handleJoinRoom,
    handleLeaveRoom,
    chats,
  } = useGameSocket();

  return (
    <ThemeProvider theme={theme}>
      <div className="app-wrapper">
        <div className="background-illustration" />
        {!roomCode ? (
          <MainMenu
            createRoomOnClick={handleCreateRoom}
            joinRoomOnClick={handleJoinRoom}
          />
        ) : gameStarted ? (
          <GameView
            isHost={isHost}
            players={players}
            handleLeaveRoom={handleLeaveRoom}
            chats={chats}
            roomCode={roomCode}
          />
        ) : (
          <RoomLobby
            roomCode={roomCode}
            players={players}
            isHost={isHost}
            handleLeaveRoom={handleLeaveRoom}
            selectedCards={selectedCards}
          />
        )}
        <AdBanner />
        <Footer />
        {isLoading && <LoadingScreen loadingText="ŁĄCZENIE Z POKOJEM..." />}
      </div>
    </ThemeProvider>
  );
}

export default App;

import Header from "../../components/Header";

type PlayerGameViewPropsType = {
  playerCard: string | undefined | null;
};

const PlayerGameView: React.FC<PlayerGameViewPropsType> = ({ playerCard }) => {
  return (
    <>
      <Header variant="h6">Twoja funkcja to:</Header>
      <Header variant="h5">{playerCard}</Header>
    </>
  );
};

export default PlayerGameView;

import Card from "../../components/Card";
import Header from "../../components/Header";
import { cards, type CardType } from "../../utils/cards";

type PlayerGameViewPropsType = {
  playerCardName: string | undefined | null;
  playerName: string | undefined | null;
};

const PlayerGameView: React.FC<PlayerGameViewPropsType> = ({
  playerCardName,
  playerName,
}) => {
  const card = cards.find((card) => card.name === playerCardName);

  if (!card) {
    return <Header variant="h6">Nie znaleziono karty</Header>;
  }
  return (
    <>
      <Header variant="h5">{playerName} </Header>
      <Header variant="h6">Twoja funkcja to:</Header>
      <div className="mt-3" style={{ maxWidth: "400px", width: "90%" }}>
        <Card card={card as CardType} isSelected={false} />
      </div>
    </>
  );
};

export default PlayerGameView;

import { Typography } from "@mui/material";
import type { Player } from "../../utils/types";

type HostGameViewPropsType = {
  players: Player[];
};

const HostGameView: React.FC<HostGameViewPropsType> = ({ players }) => {
  return (
    <div>
      {players.map((player) => (
        <div className="d-flex">
          <Typography>{player.nickname}</Typography>
          <Typography>{player.role}</Typography>
        </div>
      ))}
    </div>
  );
};

export default HostGameView;

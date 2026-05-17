import { RoleFraction } from "./cards";

export const getBadgeColor = (fraction: RoleFraction) => {
  if (fraction === RoleFraction.Mafia) {
    return "rgb(152, 0, 0)";
  } else if (fraction === RoleFraction.Police) {
    return "rgb(0, 42, 168)";
  } else if (fraction === RoleFraction.City) {
    return "rgb(211, 211, 211)";
  } else if (fraction === RoleFraction.Syndicate) {
    return "rgb(183, 143, 0)";
  } else {
    return "rgb(0,0,0,0)";
  }
};

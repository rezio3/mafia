import { RoleFraction } from "../utils/cards";
import { getBadgeColor } from "../utils/getBadgeCardColor";

const FractionColorLegend = () => {
  return (
    <div className="d-flex justify-content-center mb-3">
      <div>
        <div className="d-flex align-items-center">
          <div
            className="dot"
            style={{ backgroundColor: getBadgeColor(RoleFraction.Mafia) }}
          />{" "}
          - Mafia
        </div>
        <div className="d-flex align-items-center">
          <div
            className="dot"
            style={{ backgroundColor: getBadgeColor(RoleFraction.City) }}
          />{" "}
          - Miasto
        </div>
      </div>
      <div>
        <div className="d-flex align-items-center">
          <div
            className="dot"
            style={{ backgroundColor: getBadgeColor(RoleFraction.Police) }}
          />{" "}
          - Policja
        </div>
        <div className="d-flex align-items-center">
          <div
            className="dot"
            style={{ backgroundColor: getBadgeColor(RoleFraction.Syndicate) }}
          />{" "}
          - Syndykat
        </div>
      </div>
    </div>
  );
};

export default FractionColorLegend;

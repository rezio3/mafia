import { RoleFraction } from "../../utils/cards";
import { getBadgeColor } from "../../utils/getBadgeCardColor";
import "./fractionColorLegend.scss";

const FractionColorLegend = () => {
  return (
    <div className="d-flex justify-content-center mb-3">
      <div>
        <FractionLegendElement
          label={"Mafia"}
          color={getBadgeColor(RoleFraction.Mafia)}
        />
        <FractionLegendElement
          label={"Miasto"}
          color={getBadgeColor(RoleFraction.City)}
        />
      </div>
      <div>
        <FractionLegendElement
          label={"Policja"}
          color={getBadgeColor(RoleFraction.Police)}
        />
        <FractionLegendElement
          label={"Syndykat"}
          color={getBadgeColor(RoleFraction.Syndicate)}
        />
      </div>
    </div>
  );
};

export default FractionColorLegend;

type FractionLegendElementPropsType = {
  label: string;
  color: string;
};

const FractionLegendElement: React.FC<FractionLegendElementPropsType> = ({
  label,
  color,
}) => {
  return (
    <div className="d-flex align-items-center">
      <div className="dot" style={{ backgroundColor: color }} /> - {label}
    </div>
  );
};

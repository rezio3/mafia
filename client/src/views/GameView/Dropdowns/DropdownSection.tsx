import { useState } from "react";
import Header from "../../../components/Header";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Card from "../../../components/Card/Card";
import type { CardType } from "../../../utils/cards";
import { Typography } from "@mui/material";
import { manualsForPlayers } from "../../../utils/manuals";
import "./dropdowns.scss";

type DropdownSectionPropsType = {
  inGameCards: CardType[];
};

const DropdownSection: React.FC<DropdownSectionPropsType> = ({
  inGameCards,
}) => {
  const [isShowCards, setIsShowCards] = useState(false);
  const [isShowManuals, setIsShowManuals] = useState(false);
  return (
    <div
      className="d-flex flex-column w-100"
      style={{ maxWidth: "400px", marginTop: "30px" }}
    >
      <div
        className="dropdownButton"
        onClick={() => setIsShowCards(!isShowCards)}
      >
        <Header variant="h6" className="margin-off">
          <ExpandMoreIcon
            style={{
              fontSize: 30,
              rotate: isShowCards ? "-180deg" : "0deg",
              transition: "0.2s ease-out",
            }}
          />{" "}
          Funkcje w grze
        </Header>
      </div>
      <div
        className={`dropdown-animation-wrapper ${isShowCards ? "is-open" : ""}`}
      >
        <div style={{ minHeight: 0 }}>
          <div className="d-flex justify-content-center w-100 dropdown-content-inner">
            <div className="small-cards-container">
              {inGameCards.map((card, index) => (
                <Card card={card as CardType} key={card.name + index} isSmall />
              ))}
            </div>
          </div>
        </div>
        <div style={{ borderBottom: "1px solid rgb(174, 174, 174)" }} />
      </div>
      <div
        className="dropdownButton"
        onClick={() => setIsShowManuals(!isShowManuals)}
      >
        <Header variant="h6" className="margin-off">
          <ExpandMoreIcon
            style={{
              fontSize: 30,
              rotate: isShowManuals ? "-180deg" : "0deg",
              transition: "0.2s ease-out",
            }}
          />{" "}
          Podręcznik
        </Header>
      </div>
      <div
        className={`dropdown-animation-wrapper ${isShowManuals ? "is-open" : ""}`}
      >
        <div style={{ minHeight: 0 }}>
          <div className="d-flex flex-column w-100 dropdown-content-inner">
            <ul>
              {manualsForPlayers.map((manual) => (
                <li className="mb-2">
                  <Typography
                    className="text-sans-serif"
                    style={{ fontSize: "14px" }}
                  >
                    {manual}
                  </Typography>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div style={{ borderBottom: "1px solid rgb(174, 174, 174)" }} />
      </div>
    </div>
  );
};

export default DropdownSection;

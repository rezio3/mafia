export type CardType = {
  name: string;
  fraction: "Mafia" | "Policja" | "Miasto";
  description: string;
};

export const cards = [
  {
    name: "Szef Mafii",
    fraction: "Mafia",
    description: "Podejmuje ostateczną decyzję",
  },
  {
    name: "Kokietka",
    fraction: "Mafia",
    description: "Pokazywana jako dobra",
  },
  {
    name: "Szantażysta",
    fraction: "Mafia",
    description: "Na początku gry szantażuje jedną osobę",
  },
  {
    name: "Cattani",
    fraction: "Policja",
    description: "Co noc sprawdza jedną osobę",
  },
  {
    name: "Medyk",
    fraction: "Miasto",
    description: "Co noc leczy 1/2/3 osoby - ustala prowadzący",
  },
  {
    name: "Wariat",
    fraction: "Miasto",
    description: "W dowolny momencie gry może zabić jedną osobę",
  },
  { name: "Żyd", fraction: "Miasto", description: "Pokazywany jako zły" },
];

export type CardType = {
  name: string;
  fraction: RoleFraction;
  note: string;
  description: string;
};

export const RoleFraction = {
  Mafia: "Mafia",
  Police: "Policja",
  City: "Miasto",
  Syndicate: "Syndykat",
} as const;

export type RoleFraction = (typeof RoleFraction)[keyof typeof RoleFraction];

export const cards = [
  {
    name: "Szef Mafii",
    fraction: RoleFraction.Mafia,
    note: "Podejmuje ostateczną decyzję.",
    description: "Podejmuje ostateczną decyzję.",
  },
  {
    name: "Kokietka",
    fraction: RoleFraction.Mafia,
    note: "Pokazywana jako dobra.",
    description: "Pokazywana jako dobra.",
  },
  {
    name: "Szantażysta",
    fraction: RoleFraction.Mafia,
    note: "Szantażuje jedną osobę.",
    description:
      "Pierwszej nocy wybiera jedną osobę, którą chce szantażować. Wskazana osoba budzi się i poznaję swojego szantażystę. Od tej pory musi go chronić do końca gry i nie moża głosować przeciwko niemu.",
  },
  {
    name: "Werbunek",
    fraction: RoleFraction.Mafia,
    note: "Werbuje do Mafii 1 os.",
    description:
      "Pierwszej nocy werbuje do Mafii jedną osobę. Ta osoba jest później pokazywana jako dobra ale gra razem z Mafią.",
  },
  {
    name: "Brudna Robota",
    fraction: RoleFraction.Mafia,
    note: "Ginie za Rykoszeta i ze Świętym.",
    description: "Ginie za Rykoszeta lub razem ze Świętym.",
  },
  {
    name: "Dostawca Broni",
    fraction: RoleFraction.Mafia,
    note: "Zabija dodatkowo 1 os. (1)",
    description: "Raz w grze podczas nocy może dodatkowo zabić jedną osobę.",
  },
  {
    name: "Mściciel",
    fraction: RoleFraction.Mafia,
    note: "Zabija 1 os. po śmierci mafii.",
    description: "W nocy zabija jedną osobę po śmierci mafii.",
  },
  {
    name: "Marilyn Manson",
    fraction: RoleFraction.Mafia,
    note: "Zamyka obrady i zabija 2 os. (1)",
    description:
      "Zamyka obrady i zabija 2 osoby. Może użyć raz - przyznaje się publicznie do swojej funkcji.",
  },
  {
    name: "Cattani",
    fraction: RoleFraction.Police,
    note: "Co noc sprawdza 1 os.",
    description: "Co noc sprawdza jedną osobę.",
  },
  {
    name: "Najemnik",
    fraction: RoleFraction.Police,
    note: "Sprawdza 1 os.. Jeśli to mafia - zabija. (2)",
    description:
      "W nocy sprawdza jedną osobę. Jeśli to mafia - zabija. Może użyć 2 razy.",
  },
  {
    name: "Negocjator",
    fraction: RoleFraction.Police,
    note: "Zmusza 1 os. do ujawnienia funkcji. (1)",
    description: "Zmusza jedną osobę do ujawnienia funkcji. Może użyć raz.",
  },
  {
    name: "Aspirant",
    fraction: RoleFraction.Police,
    note: "Wywozi 1 os. na 2 doby. (1)",
    description: "W nocy wywozi 1 osobę na 2 doby. Może użyć raz.",
  },
  {
    name: "Rykoszet",
    fraction: RoleFraction.Police,
    note: "Odbija strzał Mafii w Brudną Robotę.",
    description: "Odbija strzał mafii w Brudną Robotę.",
  },
  {
    name: "Ordynariusz",
    fraction: RoleFraction.Police,
    note: "Może poznać Żyda, Kokietkę lub Anioła Śmierci. (1)",
    description:
      "W nocy dowiaduje się kto jest Żydem, Kokietką lub Aniołem Śmierci. Może użyć raz.",
  },
  {
    name: "Fenistil",
    fraction: RoleFraction.Police,
    note: "Zdejmuje naznaczenie Anioła Śmierci.",
    description: "Co noc zdejmuje naznaczenie Anioła Śmierci.",
  },
  {
    name: "Medyk",
    fraction: RoleFraction.City,
    note: "Co noc leczy 1/2/3 os.",
    description: "Co noc leczy 1/2/3 osoby - ustala prowadzący.",
  },
  {
    name: "Wariat",
    fraction: RoleFraction.City,
    note: "Zabija 1 os. (1)",
    description:
      "W dowolnym momencie gry może zabić jedną osobę. Jeśli zrobi to w dzień - ujawni wszystkim swoją funkcję. W nocy pozostaje anonimowy. Może użyć raz.",
  },
  {
    name: "Żyd",
    fraction: RoleFraction.City,
    note: "Pokazywany jako zły.",
    description:
      "Podczas sprawdzania przez Cattaniego lub przez miasto jest pokazywany jako zły.",
  },
  {
    name: "Hunter",
    fraction: RoleFraction.City,
    note: "Odbija strzał w wybraną os. (1)",
    description:
      "Kiedy ma zginąć, odbija strzał w wybraną osobę. Może użyć raz.",
  },
  {
    name: "Tarcza",
    fraction: RoleFraction.City,
    note: "Osłania 1 os.",
    description:
      "Pierwszej nocy wskazuje osobe, którą będzie osłaniał do końca gry. Jeśli ta osoba zostanie zabita w jakikolwiek sposób, zmiast niej umiera Tarcza.",
  },
  {
    name: "Amor",
    fraction: RoleFraction.City,
    note: "Łączy ze sobą 2 os.",
    description:
      "Pierwszej nocy łączy ze sobą 2 osoby. Umrą razem gdy jedna z nich zostanie zabita.",
  },
  {
    name: "Łazarz",
    fraction: RoleFraction.City,
    note: "Wskrzesza 1 os. (1)",
    description:
      "Wskrzesza 1 osobę. Musi to zrobić w tej samej turze, w której ktoś umarł. Może wskrzesić również siebie.",
  },
  {
    name: "Córa Koryntu",
    fraction: RoleFraction.City,
    note: "Poznaje funkcje 2 os.",
    description:
      "Pierwszej nocy poznaje funkcje 2 osób. Może przyznać się do swojej funkcji i powiedzieć wszystkim czego się dowiedziała.",
  },
  {
    name: "Terrorysta",
    fraction: RoleFraction.City,
    note: "Umierając zabija os. po lewej i po prawej.",
    description:
      "Umierając wybucha, zabijając osobę po lewej i po prawej stronie. Terrorysta wbrew pozorom jest z miasta, więc należy wykorzystać jego wybuch w rozsądny sposób albo nie korzystać wcale.",
  },
  {
    name: "Sędzia",
    fraction: RoleFraction.City,
    note: "Jego głos liczy się x3.",
    description:
      "Od momentu gdy przyzna się do swojej funkcji, jego głos liczy się x3.",
  },
  {
    name: "Proboszcz",
    fraction: RoleFraction.City,
    note: "Każe wszystkim głosować za zabiciem 1 os. (1)",
    description:
      "Nakazuje miastu zagłosować za zabiciem jednej osoby. Może użyć raz.",
  },
  {
    name: "Ktulu",
    fraction: RoleFraction.City,
    note: "Sprawdza 2 os., decyduje czy zabić i sam umiera. (1)",
    description:
      "Sprawdza 2 osoby, decyduje czy zabić i sam umiera. Może użyć raz.",
  },
  {
    name: "Mały Ahmed Terrorysta",
    fraction: RoleFraction.City,
    note: "Podkłada bombę o promieniu rażenia 2 os. (1)",
    description:
      "Podkłada bombę o promieniu rażenia 2 osób. Czyli podczas wybuchu umiera łącznie 5 osób. Wybucha po 3 turach. Może użyć raz. Jeśli osoba, pod która jest bomba zostanie zabita przed wybuchem bomby, bomba wybucha od razu. Żeby zapobiec wybuchowi bomby, należy przed końcem 3 tury zabić Małego Ahmeda Terrorystę.",
  },
  {
    name: "Święty",
    fraction: RoleFraction.City,
    note: "Giną wszyscy, którzy na niego zagłosowali.",
    description:
      "Giną wszyscy, którzy na niego zagłosowali. Gdy umrze, zabiera ze sobą Brudną Robotę.",
  },
  {
    name: "Kierowca",
    fraction: RoleFraction.City,
    note: "Wywozi 2 os. na 1 dobę. (2)",
    description: "W nocy wywozi 2 osoby na 1 dobę. Może użyć 2 razy",
  },
  {
    name: "Nekromanta",
    fraction: RoleFraction.City,
    note: "Przywołuje głos zza grobu. (1)",
    description:
      "Przywołuje głos zza grobu. Może użyć raz. Osoba wskrzeszona może odpowiedzieć na jedno pytanie. Może przy tym zdradzić funkcję maksymalnie jednej osoby. Np. wskazać Mafię.",
  },
  {
    name: "Legia Cudzoziemska",
    fraction: RoleFraction.City,
    note: "Wynajmowana do zabójstwa.",
    description: "Wynajmowana do zabójstwa.",
  },
  {
    name: "Pijak",
    fraction: RoleFraction.City,
    note: "Umiera za osobę z lewej lub prawej strony.",
    description: "Umiera za osobę z lewej lub prawej strony.",
  },
  {
    name: "Męczennik",
    fraction: RoleFraction.City,
    note: "Przyjmuje na siebie wyrok Mafii, zna Cattaniego i Medyka.",
    description: "Przyjmuje na siebie wyrok mafii, zna Cattaniego i Medyka.",
  },
  {
    name: "Muzyk",
    fraction: RoleFraction.City,
    note: "Wyrusza w tournee i usuwa się z gry na 5 rund. (1)",
    description:
      "Wyrusza w tournee i usuwa się z gry na 5 rund. Może użyć raz.",
  },
  {
    name: "Syryjczyk",
    fraction: RoleFraction.City,
    note: "Nie może mówić.",
    description: "Nie może mówić.",
  },
  {
    name: "Rudy",
    fraction: RoleFraction.City,
    note: "Niemowa, pokazywany jako zły, chroni 1 osobę.",
    description: "Niemowa, pokazywany jako zły, chroni 1 osobę.",
  },
  {
    name: "WSGZ4P",
    fraction: RoleFraction.City,
    note: "Wścibska sąsiadka Grażyna z 4 piętra. Może podglądać.",
    description: "Wścibska sąsiadka Grażyna z 4 piętra. Może podglądać.",
  },
  {
    name: "Mason",
    fraction: RoleFraction.Syndicate,
    note: "Zwołuje dodatkowe posiedzenie Syndykatu.",
    description: "Zwołuje dodatkowe posiedzenie Syndykatu.",
  },
  {
    name: "Kriszna",
    fraction: RoleFraction.Syndicate,
    note: "W nocy zatyka usta 5 os. na 1 dobę. (2)",
    description: "W nocy zatyka usta 5 osobom na 1 dobę. Może użyć 2 razy.",
  },
  {
    name: "Gustaw",
    fraction: RoleFraction.Syndicate,
    note: "Głosuje po śmierci.",
    description: "Głosuje po śmierci.",
  },
  {
    name: "Formoza",
    fraction: RoleFraction.Syndicate,
    note: "Poznaje 1 członka Mafii.",
    description: "Poznaje 1 członka Mafii.",
  },
  {
    name: "Anioł Śmierci",
    fraction: RoleFraction.Syndicate,
    note: "Co noc naznacza 1 os.",
    description: "Co noc naznacza jedną osobę.",
  },
  {
    name: "Leśniczy",
    fraction: RoleFraction.Syndicate,
    note: "Nakazuje 1 os. podstawić się na śmierć. (1)",
    description: "Nakazuje 1 osobie podstawić się na śmierć. Może użyć raz.",
  },
];

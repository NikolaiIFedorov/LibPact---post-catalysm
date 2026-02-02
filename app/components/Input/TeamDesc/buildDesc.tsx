import {
  FC,
  Icon,
  Button,
  Section,
  Artifacts,
  Build,
  Splitter,
  Container,
  Character,
  WeaponDesc,
  CharacterParameters,
  useState,
  CharacterDesc,
  colorFromElement,
  Weapon,
  WeaponParameters,
} from "./index";

export const BuildDesc: FC<{
  layer: number;
  build: Build;
  isSelected: boolean;
  setSelected: (unselect: boolean) => void;
  characterParameters: CharacterParameters[];
  weaponParameters: WeaponParameters[];
}> = ({
  layer,
  setSelected,
  isSelected,
  build,
  characterParameters,
  weaponParameters,
}) => {
  const [character, setCharacter] = useState<Character | undefined>(
    build.character,
  );
  const [weapon, setWeapon] = useState<Weapon | undefined>(build.weapon);
  if (build.character != character) build.character = character;
  if (build.weapon != weapon) build.weapon = weapon;

  const [characters, setCharacters] = useState<CharacterParameters[]>([]);
  const [weapons, setWeapons] = useState<WeaponParameters[]>([]);

  if (isSelected) {
    return (
      <Section layer={layer} direction="column">
        <Container direction="row" layer={layer + 1} align={true} size="faint">
          <Button
            onClick={() => setSelected(true)}
            layer={layer + 1}
            size="faint"
            icon={{ img: { lucide: "ChevronLeft" }, size: "small" }}
          />

          {build.name}
        </Container>
        <Splitter layer={layer + 1} />
        <CharacterDesc
          layer={layer + 1}
          character={character}
          parameters={characterParameters}
          setCharacter={setCharacter}
          characters={characters}
          setCharacters={setCharacters}
        />
        <Splitter layer={layer + 1} />
        <WeaponDesc
          layer={layer + 1}
          weapon={weapon}
          parameters={weaponParameters}
          setWeapon={setWeapon}
          weapons={weapons}
          setWeapons={setWeapons}
        />
        <Splitter layer={layer + 1} />
        <Artifacts layer={layer + 1} build={build} />
      </Section>
    );
  } else {
    let info: any[] = [];
    if (build.character) info.push(build.character.parameters.img);

    if (info.length == 0) {
      return (
        <Button
          onClick={() => setSelected(false)}
          layer={layer}
          direction="column"
          size="faint"
        >
          {build.name}
        </Button>
      );
    } else {
      return (
        <Button
          onClick={() => setSelected(false)}
          layer={layer}
          direction="column"
          fit="content"
          size="faint"
        >
          {info.map((i, index) => (
            <Icon
              key={index}
              layer={layer + 1}
              img={i}
              color={colorFromElement(build.character?.parameters.element)}
            />
          ))}
        </Button>
      );
    }
  }
};

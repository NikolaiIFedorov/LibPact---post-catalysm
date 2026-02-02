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
  useState,
  CharacterDesc,
  colorFromElement,
  Weapon,
} from "./index";

export const BuildDesc: FC<{
  layer: number;
  build: Build;
  isSelected: boolean;
  setSelected: (unselect: boolean) => void;
}> = ({ layer, setSelected, isSelected, build }) => {
  const [character, setCharacter] = useState<Character | undefined>(
    build.character,
  );
  const [weapon, setWeapon] = useState<Weapon | undefined>(build.weapon);
  if (build.character != character) build.character = character;
  if (build.weapon != weapon) build.weapon = weapon;

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
          setCharacter={setCharacter}
        />
        <Splitter layer={layer + 1} />
        <WeaponDesc layer={layer + 1} weapon={weapon} setWeapon={setWeapon} />
        <Splitter layer={layer + 1} />
        <Artifacts layer={layer + 1} build={build} />
      </Section>
    );
  } else {
    let info: any[] = [];
    if (build.character) info.push(build.character.parameters?.img);
    if (build.weapon) info.push(build.weapon.parameters?.img);

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
          color={
            build.character
              ? colorFromElement(build.character.parameters.element)
              : undefined
          }
        >
          {build.character && (
            <Icon
              layer={layer + 1}
              img={build.character.parameters.img}
              color={colorFromElement(build.character.parameters.element)}
            />
          )}
          {build.weapon && (
            <Icon
              layer={layer + 1}
              img={build.weapon.parameters.img}
              size="big"
              color={true}
            />
          )}
        </Button>
      );
    }
  }
};

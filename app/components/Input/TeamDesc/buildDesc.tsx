import {
  FC,
  Icon,
  Button,
  Section,
  ArtifactsDesc,
  Build,
  Splitter,
  Container,
  Character,
  WeaponDesc,
  useState,
  CharacterDesc,
  colorFromElement,
  Weapon,
  Artifacts,
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
  const [artifacts, setArtifacts] = useState<Artifacts | undefined>(
    build.artifacts,
  );

  if (build.character != character) build.character = character;
  if (build.weapon != weapon) build.weapon = weapon;
  if (build.artifacts != artifacts) build.artifacts = artifacts;

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
        <ArtifactsDesc
          layer={layer + 1}
          build={build}
          setArtifacts={setArtifacts}
        />
      </Section>
    );
  } else {
    let infoList: any[] = [];
    infoList.push(build?.character?.parameters?.img);
    infoList.push(build?.weapon?.parameters?.img);
    infoList.push(build?.artifacts?.sets?.map((set) => set?.parameters.img));
    let info =
      infoList.filter((info) => info != undefined && info.length > 0).length >
      0;

    if (!info) {
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
          direction="row"
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
              color={true}
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
          {build.artifacts?.sets &&
            build.artifacts.sets.map((set) => (
              <Icon
                layer={layer + 1}
                key={set?.parameters.name}
                img={set?.parameters.img}
                size="big"
                color={true}
              />
            ))}
        </Button>
      );
    }
  }
};

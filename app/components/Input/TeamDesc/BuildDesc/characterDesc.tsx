import {
  type FC,
  Container,
  Icon,
  Section,
  Search,
  CharacterParameters,
  Character,
  List,
  colorFromElement,
  useState,
  characterParametersFromLib,
} from "./Character/index";

export const CharacterDesc: FC<{
  layer: number;
  setCharacter: (character: Character | undefined) => void;
  character?: Character;
}> = ({ layer, character, setCharacter }) => {
  if (character) {
    return (
      <>
        <Container layer={layer - 1}>
          <Icon
            layer={layer}
            img={character.parameters?.img}
            color={colorFromElement(character.parameters?.element)}
          />
          <Container layer={layer} direction="column" weight={1}>
            <Section layer={layer} weight={1} size="faint">
              Lvl: {character.level}
            </Section>
            <Section layer={layer} weight={1} size="faint">
              C: {character.constellation}
            </Section>
          </Container>
        </Container>
        <Section layer={layer} weight={1} size="faint">
          {character.talents.normal.name}
        </Section>
        <Section layer={layer} weight={1} size="faint">
          {character.talents.skill.name}
        </Section>
        <Section layer={layer} weight={1} size="faint">
          {character.talents.burst.name}
        </Section>
      </>
    );
  } else {
    const parameters: CharacterParameters[] = characterParametersFromLib();
    const [characters, setCharacters] = useState<CharacterParameters[]>([]);
    return (
      <Container layer={layer} direction="column">
        <Search
          layer={layer}
          text="Character"
          content={parameters}
          onSearch={setCharacters}
        />
        <List layer={layer} list={characters} setCharacter={setCharacter} />
      </Container>
    );
  }
};

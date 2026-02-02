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
} from "./Character/index";

export const CharacterDesc: FC<{
  layer: number;
  setCharacter: (character: Character | undefined) => void;
  character?: Character;
  setCharacters: (parameters: CharacterParameters[]) => void;
  characters: CharacterParameters[];
  parameters: CharacterParameters[];
}> = ({
  layer,
  character,
  setCharacter,
  characters,
  setCharacters,
  parameters,
}) => {
  if (character) {
    return (
      <>
        <Container layer={layer - 1}>
          <Icon
            layer={layer}
            img={character.parameters.img}
            color={colorFromElement(character.parameters.element)}
          />
          <Container layer={layer} direction="column" weight={1}>
            <Section layer={layer} weight={1}>
              Lvl: {character.level}
            </Section>
            <Section layer={layer} weight={1}>
              C: {character.constellation}
            </Section>
          </Container>
        </Container>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
      </>
    );
  } else {
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

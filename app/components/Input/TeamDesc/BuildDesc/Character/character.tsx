import {
  type FC,
  Container,
  Icon,
  Section,
  Build,
  Search,
  charactersLib,
  CharacterLib,
  useState,
  CharacterParameters,
} from "../index";
import { List } from "./list";

export const CharacterDesc: FC<{
  layer: number;
  build: Build;
  parameters: CharacterParameters[];
}> = ({ layer, build, parameters }) => {
  if (build.character) {
    return (
      <>
        <Container layer={layer - 1}>
          <Icon layer={layer} />
          <Container layer={layer} direction="column" weight={1}>
            <Section layer={layer} weight={1}></Section>
            <Section layer={layer} weight={1}></Section>
          </Container>
        </Container>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
      </>
    );
  } else {
    const [characters, setCharacters] = useState<CharacterParameters[]>([]);
    return (
      <Container layer={layer} direction="column">
        <Search
          layer={layer}
          text="Character"
          content={parameters}
          onSearch={setCharacters}
        />
        <List layer={layer} list={characters} />
      </Container>
    );
  }
};

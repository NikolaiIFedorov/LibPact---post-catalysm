import {
  FC,
  useState,
  Search,
  SetParameters,
  setParametersFromLib,
  Container,
  List,
  Sets,
  Icon,
  Section,
} from "./";

export const SetDesc: FC<{
  layer: number;
}> = ({ layer }) => {
  const parameters: SetParameters[] = setParametersFromLib();
  const [setsList, setSetsList] = useState<SetParameters[]>([]);
  const [sets, setSets] = useState<Sets | undefined>(undefined);
  if (sets) {
    return (
      <Container layer={layer} fit="content">
        {sets.map((set, index) => (
          <Icon
            key={index}
            layer={layer}
            size="medium"
            img={set?.parameters.img}
            color={true}
          />
        ))}
      </Container>
    );
  } else {
    return (
      <Container layer={layer} direction="column" fit="parent">
        <Search
          layer={layer}
          text="Set"
          content={parameters}
          onSearch={setSetsList}
        />
        <List layer={layer + 1} list={setsList} setSets={setSets} />
      </Container>
    );
  }
};

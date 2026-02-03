import { useEffect } from "react";
import {
  FC,
  useState,
  Search,
  SetParameters,
  setParametersFromLib,
  Container,
  List,
  Sets,
  SetDesc,
  Build,
} from ".";

export const SetsDesc: FC<{
  layer: number;
  isSelected: boolean;
  build: Build;
  setSelected: () => void;
  setSets: (sets: Sets) => void;
}> = ({ layer, isSelected, setSelected, setSets, build }) => {
  const parameters: SetParameters[] = setParametersFromLib();
  const [setsList, setSetsList] = useState<SetParameters[]>([]);
  const [sets, selectSets] = useState<Sets | undefined>(build.artifacts?.sets);

  const [selectedSet, setSelectedSet] = useState<string | undefined>(undefined);

  if (sets) {
    return (
      <Container layer={layer} fit="content">
        {sets.map((set, index) => (
          <SetDesc
            key={index}
            layer={layer}
            set={set}
            _4pc={setsList.length == 1}
            isSelected={isSelected && selectedSet === set?.parameters.name}
            setSelected={() => {
              setSelected();
              setSelectedSet(set?.parameters.name);
              setSets(sets);
            }}
          />
        ))}
      </Container>
    );
  } else {
    return (
      <Container layer={layer} direction="column" fit="content" minWidth="100%">
        <Search
          layer={layer}
          text="Set"
          content={parameters}
          onSearch={setSetsList}
        />
        <List
          layer={layer + 1}
          list={setsList}
          setSets={(sets) => {
            selectSets(sets);
            setSets(sets);
          }}
        />
      </Container>
    );
  }
};

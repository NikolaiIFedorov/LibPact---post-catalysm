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
} from ".";

export const SetsDesc: FC<{
  layer: number;
  isSelected: boolean;
  setSelected: () => void;
  setSets: (sets: Sets) => void;
}> = ({ layer, isSelected, setSelected, setSets }) => {
  const parameters: SetParameters[] = setParametersFromLib();
  const [setsList, setSetsList] = useState<SetParameters[]>([]);
  const [sets, selectSets] = useState<Sets | undefined>(undefined);

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
      <Container layer={layer} direction="column" fit="parent">
        <Search
          layer={layer}
          text="Set"
          content={parameters}
          onSearch={setSetsList}
        />
        <List layer={layer + 1} list={setsList} setSets={selectSets} />
      </Container>
    );
  }
};

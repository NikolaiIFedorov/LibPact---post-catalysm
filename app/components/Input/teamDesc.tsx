"use client";

import { useState } from "react";
import {
  FC,
  Splitter,
  Section,
  Team,
  BuildDesc,
  CharacterImages,
} from "./index";
import { Parameters } from "./TeamDesc/parameters";

export const TeamDesc: FC<{
  layer: number;
  team: Team;
  characterImgs: CharacterImages[];
}> = ({ layer, team, characterImgs }) => {
  const [selected, setSelected] = useState<number | undefined>(undefined);
  return (
    <Section layer={layer} direction="column">
      {team.name}
      <Splitter layer={layer + 1} />
      <BuildDesc
        layer={layer + 1}
        build={team.builds[0]}
        isSelected={selected === 0}
        setSelected={(unselect?: boolean) =>
          setSelected(unselect ? undefined : 0)
        }
        characterImgs={characterImgs}
      />
      <BuildDesc
        layer={layer + 1}
        build={team.builds[1]}
        isSelected={selected === 1}
        setSelected={(unselect?: boolean) =>
          setSelected(unselect ? undefined : 1)
        }
        characterImgs={characterImgs}
      />
      <BuildDesc
        layer={layer + 1}
        build={team?.builds[2]}
        isSelected={selected === 2}
        setSelected={(unselect?: boolean) =>
          setSelected(unselect ? undefined : 2)
        }
        characterImgs={characterImgs}
      />
      <BuildDesc
        layer={layer + 1}
        build={team?.builds[3]}
        isSelected={selected === 3}
        setSelected={(unselect?: boolean) =>
          setSelected(unselect ? undefined : 3)
        }
        characterImgs={characterImgs}
      />
      <Splitter layer={layer + 1} />
      <Parameters layer={layer + 1} />
    </Section>
  );
};

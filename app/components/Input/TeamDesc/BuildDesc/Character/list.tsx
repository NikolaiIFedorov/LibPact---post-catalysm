import {
  CharacterLib,
  CharacterParameters,
  CharacterImages,
  FC,
  Section,
} from "../";

export const List: FC<{
  layer: number;
  list: CharacterLib[];
  imgs: CharacterImages[];
}> = ({ layer, list, imgs }) => {
  if (list.length > 0) {
    return <Section layer={layer} fit="content"></Section>;
  } else {
    return <></>;
  }
};

function parametersFromLib(lib: CharacterLib[], imgs: string[]) {}

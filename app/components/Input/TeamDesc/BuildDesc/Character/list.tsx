import { CharacterLib, FC, Section } from "../";

export const List: FC<{ layer: number; list: CharacterLib[] }> = ({
  layer,
  list,
}) => {
  if (list.length > 0) {
    return <Section layer={layer} fit="content"></Section>;
  } else {
    return <></>;
  }
};

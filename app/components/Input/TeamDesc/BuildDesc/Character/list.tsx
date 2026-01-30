import { CharacterParameters, FC, Section } from "../";

export const List: FC<{
  layer: number;
  list: CharacterParameters[];
}> = ({ layer, list }) => {
  if (list.length > 0) {
    console.log(list);
    return <Section layer={layer} fit="content"></Section>;
  } else {
    return <></>;
  }
};

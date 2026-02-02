import {
  CharacterParameters,
  FC,
  Section,
  Button,
  colorFromElement,
  Character,
  getCharacter,
  DbImg,
} from "./index";

export const List: FC<{
  layer: number;
  list: CharacterParameters[];
  setCharacter?: (character: Character | undefined) => void;
}> = ({ layer, list, setCharacter }) => {
  if (list.length > 0) {
    const imgs: DbImg[] = list.map((p) => ({
      name: p.name,
      img: p.img,
    }));
    return (
      <Section layer={layer} maxWidth="100px" maxHeight="200px" fit="content">
        {list.map((p, i) => (
          <Button
            key={i}
            layer={layer + 1}
            icon={{
              img: p.img,
              size: "big",
              color: colorFromElement(p.element),
            }}
            onClick={() =>
              setCharacter && setCharacter(getCharacter(p.name, imgs))
            }
          />
        ))}
      </Section>
    );
  } else {
    return <></>;
  }
};

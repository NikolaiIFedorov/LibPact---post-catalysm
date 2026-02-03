import { FC, Section, Button, Sets, SetParameters, getSet } from "./index";

export const List: FC<{
  layer: number;
  list: SetParameters[];
  setSets: (sets: Sets) => void;
}> = ({ layer, list, setSets }) => {
  if (list.length > 0) {
    return (
      <Section layer={layer} maxWidth="100px" maxHeight="200px" fit="content">
        {list.map((c, i) => (
          <Button
            key={i}
            layer={layer + 1}
            icon={{
              img: c.img,
              size: "big",
              color: true,
            }}
            onClick={() => setSets(getSet([c.name, undefined, undefined]))}
          />
        ))}
      </Section>
    );
  } else {
    return <></>;
  }
};

import {
  Icon,
  Button,
  FC,
  ArtifactPieces,
  Flower,
  Plume,
  Sands,
  Goblet,
  Circlet,
  Section,
  Container,
} from "./";

export const Piece: FC<{
  layer: number;
  name: keyof ArtifactPieces;
  piece: Flower | Plume | Sands | Goblet | Circlet | undefined;
  isSelected: boolean;
  setSelected: () => void;
}> = ({ layer, name, isSelected, setSelected, piece }) => {
  if (isSelected) {
    return (
      <Section layer={layer + 1} size="faint" fit="parent">
        <Icon layer={layer + 2} size="medium" img={name} color={true} />
        <Container layer={layer + 2} direction="column">
          {piece?.main}
          {piece?.subStats.map((sub, index) => (
            <div key={index}>{sub?.stat + ": " + sub?.rolls}</div>
          ))}
        </Container>
      </Section>
    );
  } else {
    return (
      <Button
        layer={layer + 1}
        icon={{ size: "medium", img: name, color: true }}
        onClick={setSelected}
      />
    );
  }
};

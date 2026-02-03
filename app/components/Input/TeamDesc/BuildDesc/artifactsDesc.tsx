import {
  FC,
  Container,
  Piece,
  SetDesc,
  Artifacts,
  useState,
  ArtifactPieces,
  getArtifactPieces,
  Sets,
} from "./Artifacts";

export const ArtifactsDesc: FC<{ layer: number; artifacts?: Artifacts }> = ({
  layer,
  artifacts,
}) => {
  let pieces: ArtifactPieces = artifacts?.pieces ?? getArtifactPieces();

  const [selected, setSelected] = useState<string | null>(null);
  return (
    <Container layer={layer} direction="row" maxWidth="128px">
      <SetDesc layer={layer} />
      <Piece
        layer={layer + 1}
        name="Flower"
        piece={pieces.Flower}
        isSelected={selected === "Flower"}
        setSelected={() => setSelected("Flower")}
      />
      <Piece
        layer={layer + 1}
        name="Plume"
        piece={pieces.Plume}
        isSelected={selected === "Plume"}
        setSelected={() => setSelected("Plume")}
      />
      <Piece
        layer={layer + 1}
        name="Sands"
        piece={pieces.Sands}
        isSelected={selected === "Sands"}
        setSelected={() => setSelected("Sands")}
      />
      <Piece
        layer={layer + 1}
        name="Goblet"
        piece={pieces.Goblet}
        isSelected={selected === "Goblet"}
        setSelected={() => setSelected("Goblet")}
      />
      <Piece
        layer={layer + 1}
        name="Circlet"
        piece={pieces.Circlet}
        isSelected={selected === "Circlet"}
        setSelected={() => setSelected("Circlet")}
      />
    </Container>
  );
};

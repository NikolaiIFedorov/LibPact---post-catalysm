import {
  FC,
  Container,
  Piece,
  Build,
  useState,
  useEffect,
  ArtifactPieces,
  getArtifactPieces,
  SetsDesc,
  Sets,
  Artifacts,
} from "./Artifacts";

export const ArtifactsDesc: FC<{
  layer: number;
  build: Build;
  setArtifacts: (artifacts: Artifacts) => void;
}> = ({ layer, build, setArtifacts }) => {
  let artifacts = build?.artifacts;

  let pieces: ArtifactPieces = artifacts?.pieces ?? getArtifactPieces();
  const [sets, setSets] = useState<Sets>(artifacts?.sets ?? []);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    if (!artifacts) artifacts = {};
    artifacts.sets = sets;
    setArtifacts(artifacts);
  }, [sets]);

  useEffect(() => {
    if (!artifacts) artifacts = {};
    artifacts.pieces = pieces;
    setArtifacts(artifacts);
  }, [pieces]);

  return (
    <Container layer={layer} direction="row" maxWidth="128px">
      <SetsDesc
        layer={layer}
        build={build}
        isSelected={selected === "Set"}
        setSelected={() => setSelected("Set")}
        setSets={setSets}
      />
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

import { Build, FC, Search, Section } from "./Character";

export const Artifacts: FC<{ layer: number; build: Build }> = ({
  layer,
  build,
}) => {
  if (build.artifacts) {
    return <Section layer={layer} />;
  } else return <Search layer={layer} text="Artifacts" />;
};

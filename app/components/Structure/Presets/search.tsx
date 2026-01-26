import { JSX } from "react";
import { FC, layerStyles, Icon } from "../";

export const Search: FC<{
  layer: number;
  text: string;
  filters?: string[];
}> = ({ layer, text, filters }) => {
  let filterList;
  if (filters)
    filterList = filters?.map((filter) => (
      <Icon key={filter} layer={layer} size="tiny" name={filter} />
    ));

  return (
    <div
      style={{
        flexDirection: "column",
        display: "flex",
        gap: layerStyles.spacing(layer),
      }}
    >
      <div
        style={{
          ...layerStyles.FAINT(layer),

          flexDirection: "row",
          display: "flex",

          alignItems: "center",
        }}
      >
        <Icon layer={layer} size="tiny" name="Search" />
        {text}
      </div>
      {filterList}
    </div>
  );
};

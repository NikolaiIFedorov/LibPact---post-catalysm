import { JSX } from "react";
import { FC, layerStyles, Icon } from "../";
import presets from "../presets.module.css";

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
      className={presets.searchColumn}
      style={{ ...layerStyles.vars(layer) }}
    >
      <div className={presets.searchFaint}>
        <Icon layer={layer} size="tiny" name="Search" />
        {text}
      </div>
      {filterList}
    </div>
  );
};

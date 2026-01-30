import { FC, layerStyles, Icon } from "../";

export type SearchContent = {
  name: string;
  short: string;
  content: any;
};

export const Search: FC<{
  layer: number;
  text: string;
  content: any[];
  onSearch: (results: any[]) => void;
}> = ({ layer, text, content, onSearch }) => {
  return (
    <div
      style={{
        ...layerStyles.FAINT(layer),

        flexDirection: "row",
        display: "flex",

        alignItems: "center",
      }}
    >
      <Icon layer={layer} size="tiny" img={{ lucide: "Search" }} />
      <input
        style={{
          maxWidth: "100px",
          borderTopRightRadius: "inherit",
          borderBottomRightRadius: "inherit",
          border: "none",
          background: "transparent",
          outline: "none",
          color: layerStyles.itemColor(layer),
        }}
        type="text"
        placeholder={text}
        onChange={(e) => {
          onSearch(getResult(e.target.value, content));
        }}
        onClick={() => onSearch(content)}
      />
    </div>
  );
};

function shortFromName(name: string): string {
  return name
    .split(" ")
    .map((word) => word.charAt(0).toLowerCase())
    .join("");
}

function getResult(input: string, content: any[]): any[] {
  let results: any[] = [];
  const lowerInput = input.toLowerCase();

  for (const item of content) {
    const name = item.name;
    const lowerName = name.toLowerCase();
    if (lowerName.startsWith(lowerInput)) results.push(item);
  }

  for (const item of content) {
    if (results.includes(item)) continue;
    const name = item.name;
    const lowerName = name.toLowerCase();
    const short = shortFromName(name);
    if (lowerName.includes(lowerInput) || short.startsWith(lowerInput))
      results.push(item);
  }
  return results;
}

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

function getSegment(name: string, inputLower: string): string {
  const segments = name.toLowerCase().split(" ");
  if (segments.length == 1) return name;
  else {
    const relevantSegments = segments.filter((seg) => seg.includes(inputLower));
    return relevantSegments.sort((x, y) => x.length - y.length)[0];
  }
}

function sortNameLength(a: string, b: string, inputLower: string): number {
  const aSegment = getSegment(a, inputLower);
  const bSegment = getSegment(b, inputLower);
  return aSegment.length - bSegment.length;
}

function getResult(input: string, content: any[]): any[] {
  let results: any[] = [];
  const inputLower = input.toLowerCase();

  for (const item of content) {
    const name = getSegment(item.name, inputLower);
    if (!name) continue;

    const lowerName = name.toLowerCase();
    if (lowerName.startsWith(inputLower)) results.push(item);
  }

  results.sort((a, b) => {
    return sortNameLength(a.name, b.name, inputLower);
  });

  for (const item of content) {
    if (results.includes(item)) continue;
    const name = item.name;
    const lowerName = name.toLowerCase();
    const short = shortFromName(name);
    if (lowerName.includes(inputLower) || short.startsWith(inputLower))
      results.push(item);
  }
  return results;
}

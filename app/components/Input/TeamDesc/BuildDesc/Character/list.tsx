import { CharacterParameters, FC, Section, Button, Element } from "../";

function colorFromElement(element: Element) {
  switch (element) {
    case "Anemo":
      return "#5fddac";
    case "Geo":
      return "#f1bf37";
    case "Electro":
      return "#d08ffc";
    case "Dendro":
      return "#97d00f";
    case "Hydro":
      return "#04c9f9";
    case "Pyro":
      return "#ea6102";
    case "Cryo":
      return "#9af3f6";
    default:
      return "#040506";
  }
}

export const List: FC<{
  layer: number;
  list: CharacterParameters[];
}> = ({ layer, list }) => {
  if (list.length > 0) {
    return (
      <Section layer={layer} maxWidth="100px" maxHeight="200px" fit="content">
        {list.map((p, i) => (
          <Button
            key={i}
            layer={layer + 1}
            icon={{
              img: p.images.icon,
              size: "big",
              color: colorFromElement(p.element),
            }}
          />
        ))}
      </Section>
    );
  } else {
    return <></>;
  }
};

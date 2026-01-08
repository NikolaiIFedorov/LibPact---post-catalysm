interface Props {
  layer: number;

  weight?: number;
}

export function Icon({ layer, weight }: Props) {
  return (
    <div
      style={{
        width: "64px",
        height: "64px",

        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        borderRadius: `calc(var(--spacing) / ${layer})`,
      }}
      className={"Icon"}
    ></div>
  );
}

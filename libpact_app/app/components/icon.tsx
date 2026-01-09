import React from "react";

interface Props {
  layer: number;

  children?: React.ReactNode;
}

export function Icon({ layer, children }: Props) {
  return (
    <div
      style={{
        width: "64px",
        height: "64px",

        backgroundColor: `hsl(0, 0%, ${15 * layer}%)`,
        borderRadius: `calc(var(--spacing) / ${layer})`,
      }}
      className={"Icon"}
    >
      {children}
    </div>
  );
}

import { FCParent, FlexProps } from "../";

export const Button: FCParent<FlexProps & { onClick: () => void }> = ({
  weight,
  children,
  onClick,
}) => {
  return (
    <button onClick={onClick} style={{ flex: weight }}>
      {children}
    </button>
  );
};

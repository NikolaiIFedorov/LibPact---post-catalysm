import { FCParent } from ".";

export const Button: FCParent<{ onClick: () => void }> = ({
  children,
  onClick,
}) => {
  return <button onClick={onClick}>{children}</button>;
};

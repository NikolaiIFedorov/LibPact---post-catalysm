import { Section, Container, Icon } from "./index";
import { deleteData, downloadData, uploadData } from "../../../db/db";

interface TeamsProps {
  weight?: number;
}

export function Teams({ weight }: TeamsProps) {
  return (
    <Section weight={weight} layer={1} direction="column">
      <TeamList />
    </Section>
  );
}

async function TeamList() {
  const data = await downloadData("teams");
  if (!data[0]) return <Icon layer={2}></Icon>;

  let list = [];
  for (let i = 0; i < data.length; i++) {
    list.push(<Icon key={i} layer={2} />);
  }

  return <>{list}</>;
}

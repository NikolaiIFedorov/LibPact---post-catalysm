import { Page } from "./components/page";

import { Input } from "./components/input";
import { Output } from "./components/output";

export default function Home() {
  return (
    <Page>
      <Input weight={1} />
      <Output weight={4} />
    </Page>
  );
}

import { downloadData, deleteData } from "../../../db/db";

export async function Section() {
  console.log(await downloadData("characters"));
}

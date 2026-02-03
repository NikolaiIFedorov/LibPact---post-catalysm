import {
  artifactsLib,
  charactersLib,
  weaponsLib,
} from "@/input_types/Team/Build/index.ts";

import { getImgs } from "@/db/db";

async function fetchImgs(type: "character" | "weapon" | "artifact") {
  let results: { name: string; img: string }[] = [];
  let resultCount = 0;

  let lib: any = [];
  if (type === "character") lib = charactersLib;
  else if (type === "weapon") lib = weaponsLib;
  else if (type === "artifact") lib = artifactsLib;

  for (const itemLib of lib) {
    const count = lib.length;
    const progress = ((resultCount + 1) / count) * 100;
    console.log(progress.toFixed(2) + "%: " + itemLib.name);

    const name = itemLib.name;
    if (name.startsWith("Traveler (")) {
      results.push({ name: "Traveler", img: "Traveler icon" });
      continue;
    }

    let result: { name: string; img: string } = {
      name: name,
      img: "",
    };

    await getImgs(name, type).then((imagePath) => {
      result.img = imagePath;
    });

    results.push(result);
    resultCount++;
  }
  console.log(results);
}

fetchImgs("artifact");

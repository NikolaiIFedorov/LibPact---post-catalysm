import { charactersLib } from "@/input_types/Team/Build/index.ts";

import { getImgs } from "@/db/db";

let results: { name: string; img: string }[] = [];
let resultCount = 0;
for (const libCharacter of charactersLib) {
  const charactersCount = charactersLib.length;
  const progress = ((resultCount + 1) / charactersCount) * 100;
  console.log(progress.toFixed(2) + "%: " + libCharacter.name);

  const name = libCharacter.name;
  if (name.includes("Traveler")) {
    results.push({ name: "Traveler", img: "Traveler icon" });
    continue;
  }

  let result: { name: string; img: string } = {
    name: name,
    img: "",
  };

  await getImgs(name, "character").then((imagePath) => {
    result.img = imagePath;
  });

  results.push(result);
  resultCount++;
}

console.log(results);

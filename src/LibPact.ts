import { charactersLib } from "@/input_types/Team/Build/index.ts";
import { getImages } from "@/input_types/Team/Build/character.ts";

let results: any[] = [];

for (const libCharacter of charactersLib) {
  const resultCount = results.length;
  const charactersCount = charactersLib.length;
  const progress = ((resultCount + 1) / charactersCount) * 100;
  console.log(progress.toFixed(2) + "%: " + libCharacter.name);

  const name = libCharacter.name;
  let result = { name: name, icon: "", sticker: "" };

  if (!name.includes("Traveler")) continue;
  await getImages(name).then((images) => {
    result.icon = images.icon;
    result.sticker = images.sticker;
  });

  results.push(result);
}

console.log(results);

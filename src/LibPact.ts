import { charactersLib } from "@/input_types/Team/Build/index.ts";
import {
  CharacterImages,
  getImages,
} from "@/input_types/Team/Build/character.ts";

import { dbImg } from "@/db/db";

let results: { character: string }[] = [];
let resultCount = 0;
for (const libCharacter of charactersLib) {
  const charactersCount = charactersLib.length;
  const progress = ((resultCount + 1) / charactersCount) * 100;
  console.log(progress.toFixed(2) + "%: " + libCharacter.name);

  const name = libCharacter.name;

  if (name.includes("Traveler")) {
    results.push({ ...(await getImages("Aether")), character: "Aether" });
    results.push({ ...(await getImages("Lumine")), character: "Lumine" });
  } else {
    let result: CharacterImages & { character: string } = {
      character: name,
      icon: "",
      sticker: null,
    };

    await getImages(name).then((images) => {
      result.icon = images.icon;
      result.sticker = images.sticker;
    });

    results.push(result);
  }

  resultCount++;
}

await dbImg.insert(results);

console.log(await dbImg.get());

import { getCharacter } from "../types/character.ts";
import { getWeapon } from "../types/weapon.ts";

const Kazuha = await getCharacter("Kazuha", 8, 0);
const FreedomSworn = getWeapon("Freedom", 90, 1);

console.log(FreedomSworn);

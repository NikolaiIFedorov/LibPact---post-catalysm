import * as Build from "./Setup/Build.ts";

const customInvestment: Build.Investment = {
  characterLvl: 90,
  weaponLvl: 70,
  talentLvl: 6,
};

// Defining a build
let Raiden: Build.Build = new Build.Build(
  "Raiden shogun",
  "Engulfing lightning",
  customInvestment
);

// Getting damate
const damage = Raiden.GetDamage();

console.log(damage);

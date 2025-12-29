import * as Build from "./setup/build.ts";

const customInvestment: Build.Investment = {
  characterLvl: 90,
  weaponLvl: 70,
  talentLvl: 6,
};

// Defining a build
let Raiden: Build.Build = new Build.Build(
  "Lauma",
  "Engulfing lightning",
  customInvestment
);

// Getting damate
const damage = Raiden.GetDamage();

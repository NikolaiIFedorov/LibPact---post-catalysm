import * as Character from "../GenshinDB/Character.ts";
import * as Weapon from "../GenshinDB/Weapon.ts";

import * as Damage from "./Damage/Damage.ts";

type Investment = {
  characterLvl: number;
  talentLvl: number;
  weaponLvl: number;
};

type InvestmentLevel = {
  HIGH: Investment;
  MEDIUM: Investment;
  LOW: Investment;
};

export let INVESTMENT_LEVEL: InvestmentLevel = {
  HIGH: { characterLvl: 90, weaponLvl: 90, talentLvl: 10 },
  MEDIUM: { characterLvl: 90, weaponLvl: 80, talentLvl: 6 },
  LOW: { characterLvl: 90, weaponLvl: 60, talentLvl: 1 },
};

export class Stats {
  // TLDR: The stat names have to be renmaed according to the genshin-db library to make calculations easier
  // For example, each character has a specialized stat. For Raiden, it is Energy recharge, for Lauma it is Elemental mastery, etc.
  // When the character
  atk: number = 0;
  cr: number = 5;
  cd: number = 50;
  em: number = 0;
  hp: number = 0;
  def: number = 0;
  Energy_Recharge: number = 0;
  physical: number = 0;
  pyro: number = 0;
  hydro: number = 0;
  cryo: number = 0;
  electro: number = 0;
  dendro: number = 0;
  anemo: number = 0;
  geo: number = 0;
  normal: number = 0;
  skill: number = 0;
  burst: number = 0;
  DMG: number = 0;

  constructor(character: any, weapon: any, investment: Investment) {
    this.#AddCharacter(character, investment);
    this.#AddWeapon(weapon, investment);
  }

  #Add(name: string, add: number) {
    const stat: string = name.replaceAll(" ", "_");
    this[stat as keyof Stats] += add;
  }

  #AddCharacter(character: any, investment: Investment) {
    const characterLvl = investment.characterLvl;

    const statsCharacter: any = character.stats(characterLvl);
    this.hp += statsCharacter.hp;
    this.atk += statsCharacter.attack;
    this.def += statsCharacter.defense;

    const statCharacter: string = character.substatText;
    const addStatCharacter: number = statsCharacter.specialized * characterLvl;
    this.#Add(statCharacter, addStatCharacter);
  }

  #AddWeapon(weapon: any, investment: Investment) {
    const statsWeapon: any = weapon.stats(investment.weaponLvl);
    this.atk += statsWeapon.attack;

    const statWeapon: string = weapon.mainStatText;
    const weaponLvl = investment.weaponLvl;
    const addStatWeapon: number = statsWeapon.specialized * weaponLvl;
    this.#Add(statWeapon, addStatWeapon);
  }
}

export class Build {
  character: any;
  weapon: any;
  investment: Investment | undefined;
  stats: Stats;

  constructor(character: string, weapon: string, investment: Investment) {
    this.character = Character.Get(character);
    this.weapon = Weapon.Get(weapon);
    this.investment = investment;
    this.stats = new Stats(this.character, this.weapon, this.investment);
  }

  GetDamage() {
    return Damage.Get(this.stats, this.character, this.investment);
  }
}

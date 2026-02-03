export type Substat = {
  stat:
    | "HP"
    | "HP%"
    | "DEF"
    | "DEF%"
    | "ATK"
    | "ATK%"
    | "CRIT_Rate"
    | "CRIT_DMG"
    | "Elemental_Mastery"
    | "Energy_Recharge";
  rolls: number;
};

export type Substats = [Substat?, Substat?, Substat?, Substat?];

export type Flower = {
  main: "HP";
  subStats: Substats;
};

export type Plume = {
  main: "ATK";
  subStats: Substats;
};

export type Sands = {
  main: "ATK%" | "HP%" | "DEF%" | "Elemental_Mastery" | "Energy_Recharge";
  subStats: Substats;
};

export type Goblet = {
  main:
    | "ATK%"
    | "HP%"
    | "DEF%"
    | "Elemental_Mastery"
    | "Physical_DMG_Bonus"
    | "Pyro_DMG_Bonus"
    | "Hydro_DMG_Bonus"
    | "Cryo_DMG_Bonus"
    | "Electro_DMG_Bonus"
    | "Dendro_DMG_Bonus"
    | "Anemo_DMG_Bonus"
    | "Geo_DMG_Bonus";
  subStats: Substats;
};

export type Circlet = {
  main:
    | "ATK%"
    | "HP%"
    | "DEF%"
    | "Elemental_Mastery"
    | "Energy_Recharge"
    | "CRIT_Rate"
    | "CRIT_DMG"
    | "Healing_Bonus";
  subStats: Substats;
};

export type ArtifactPieces = {
  Flower?: Flower;
  Plume?: Plume;
  Sands?: Sands;
  Goblet?: Goblet;
  Circlet?: Circlet;
};

export function getArtifactPieces(
  element?:
    | "Pyro"
    | "Hydro"
    | "Cryo"
    | "Electro"
    | "Dendro"
    | "Anemo"
    | "Geo"
    | "Physical",
) {
  const flower: Flower = {
    main: "HP",
    subStats: [
      {
        stat: "CRIT_Rate",
        rolls: 1,
      },
      {
        stat: "CRIT_DMG",
        rolls: 1,
      },
      {
        stat: "ATK%",
        rolls: 1,
      },
    ],
  };

  const plume: Plume = {
    main: "ATK",
    subStats: [
      {
        stat: "CRIT_Rate",
        rolls: 1,
      },
      {
        stat: "CRIT_DMG",
        rolls: 1,
      },
      {
        stat: "ATK%",
        rolls: 1,
      },
    ],
  };

  const sands: Sands = {
    main: "ATK%",
    subStats: [
      {
        stat: "CRIT_Rate",
        rolls: 1,
      },
      {
        stat: "CRIT_DMG",
        rolls: 1,
      },
    ],
  };

  const goblet: Goblet = {
    main: element ? `${element}_DMG_Bonus` : "ATK%",
    subStats: [
      {
        stat: "CRIT_Rate",
        rolls: 1,
      },
      {
        stat: "CRIT_DMG",
        rolls: 1,
      },
    ],
  };

  const circlet: Circlet = {
    main: "CRIT_Rate",
    subStats: [
      {
        stat: "ATK%",
        rolls: 1,
      },
      {
        stat: "CRIT_DMG",
        rolls: 1,
      },
    ],
  };

  const artifactPieces: ArtifactPieces = {
    Flower: flower,
    Plume: plume,
    Sands: sands,
    Goblet: goblet,
    Circlet: circlet,
  };

  return artifactPieces;
}

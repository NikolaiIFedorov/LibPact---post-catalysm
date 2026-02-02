import {
  type FC,
  Container,
  Icon,
  Section,
  Search,
  Weapon,
  List,
  WeaponParameters,
} from "./Weapon/";

export const WeaponDesc: FC<{
  layer: number;
  parameters: WeaponParameters[];
  setWeapon: (weapon: Weapon | undefined) => void;
  weapon?: Weapon;
  setWeapons: (weaponParameters: WeaponParameters[]) => void;
  weapons: WeaponParameters[];
}> = ({ layer, weapon, setWeapon, setWeapons, weapons }) => {
  if (weapon) {
    return (
      <>
        <Container layer={layer - 1}>
          <Icon layer={layer} img={weapon.parameters.img} />
          <Container layer={layer} direction="column" weight={1}>
            <Section layer={layer} weight={1}>
              Lvl: {weapon.level}
            </Section>
            <Section layer={layer} weight={1}>
              R: {weapon.refinement}
            </Section>
          </Container>
        </Container>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
        <Section layer={layer} weight={1}></Section>
      </>
    );
  } else {
    return (
      <Container layer={layer} direction="column">
        <Search
          layer={layer}
          text="Weapon"
          content={weapons}
          onSearch={setWeapons}
        />
        <List layer={layer} list={weapons} setWeapon={setWeapon} />
      </Container>
    );
  }
};

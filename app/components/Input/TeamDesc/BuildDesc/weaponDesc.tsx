import {
  type FC,
  Container,
  Icon,
  Section,
  Search,
  Weapon,
  List,
  WeaponParameters,
  weaponParametersFromLib,
  useState,
} from "./Weapon/";

export const WeaponDesc: FC<{
  layer: number;
  setWeapon: (weapon: Weapon | undefined) => void;
  weapon?: Weapon;
}> = ({ layer, weapon, setWeapon }) => {
  if (weapon) {
    return (
      <>
        <Container layer={layer - 1}>
          <Icon layer={layer} img={weapon.parameters?.img} color={true} />
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
    const parameters: WeaponParameters[] = weaponParametersFromLib();
    const [weapons, setWeapons] = useState<WeaponParameters[]>([]);
    return (
      <Container layer={layer} direction="column">
        <Search
          layer={layer}
          text="Weapon"
          content={parameters}
          onSearch={setWeapons}
        />
        <List layer={layer} list={weapons} setWeapon={setWeapon} />
      </Container>
    );
  }
};

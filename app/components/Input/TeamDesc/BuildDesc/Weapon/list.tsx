import {
  FC,
  Section,
  Button,
  Weapon,
  WeaponParameters,
  getWeapon,
  DbImg,
} from "./index";

export const List: FC<{
  layer: number;
  list: WeaponParameters[];
  setWeapon?: (weapon: Weapon | undefined) => void;
}> = ({ layer, list, setWeapon }) => {
  if (list.length > 0) {
    const imgs: DbImg[] = list.map((p) => ({
      name: p.name,
      img: p.img,
    }));
    return (
      <Section layer={layer} maxWidth="100px" maxHeight="200px" fit="content">
        {list.map((c, i) => (
          <Button
            key={i}
            layer={layer + 1}
            icon={{
              img: c.img,
              size: "big",
            }}
            onClick={() =>
              setWeapon && setWeapon(getWeapon(c.name, 90, 1, imgs))
            }
          />
        ))}
      </Section>
    );
  } else {
    return <></>;
  }
};

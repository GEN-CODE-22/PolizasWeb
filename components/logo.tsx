import Image from "next/image";
import { FC } from "react";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  iconOnly?: boolean;
}

export const Logo: FC<IconProps> = ({ iconOnly = false, ...props }) => {
  return (
    <Image
      src={"/gas-nieto.png"}
      alt={"Logo"}
      width={200}
      height={200}
      className="object-cover "
    />
  );
};

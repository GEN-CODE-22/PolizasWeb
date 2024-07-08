import { useIsMounted } from "@/hooks/use-is-mounted";
import { useLayout } from "@/hooks/use-layout";
import { LAYOUT_OPTIONS } from "../config/enums";
import CarbonLayout from "./carbon/carbon-layout";
import AuthWrapper from "../../components/Auth";
import Catalogos from "../Shared/Catalogos";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const isMounted = useIsMounted();
  const { layout } = useLayout();

  if (!isMounted) {
    return null;
  }

  // if (layout === LAYOUT_OPTIONS.CARBON) {
  //   return <CarbonLayout>{children}</CarbonLayout>;
  // }

  return (
    <Catalogos>
      <AuthWrapper>
        <CarbonLayout>{children}</CarbonLayout>
      </AuthWrapper>
    </Catalogos>
  );
}

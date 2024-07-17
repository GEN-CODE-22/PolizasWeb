import { useIsMounted } from "@/hooks/use-is-mounted";

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

  if (!isMounted) {
    return null;
  }

  return (
    <Catalogos>
      <AuthWrapper>
        <CarbonLayout>{children}</CarbonLayout>
      </AuthWrapper>
    </Catalogos>
  );
}

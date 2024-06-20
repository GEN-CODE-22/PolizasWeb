import { useIsMounted } from "@/hooks/use-is-mounted";
import { useLayout } from "@/hooks/use-layout";
import { LAYOUT_OPTIONS } from "../config/enums";
import { HydrogenLayout } from "./hydrogen/layout";
import CarbonLayout from "./carbon/carbon-layout";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <LayoutProvider>{children}</LayoutProvider>;
}

function LayoutProvider({ children }: LayoutProps) {
  const { layout } = useLayout();
  const isMounted = useIsMounted();

  if (!isMounted) {
    return null;
  }
  if (layout === LAYOUT_OPTIONS.CARBON) {
    return <CarbonLayout>{children}</CarbonLayout>;
  }

  return <CarbonLayout>{children}</CarbonLayout>;
}

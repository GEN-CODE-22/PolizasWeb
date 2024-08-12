import CarbonLayout from "./carbon/carbon-layout";
import AuthWrapper from "../../components/Auth";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <CarbonLayout>{children}</CarbonLayout>;
}

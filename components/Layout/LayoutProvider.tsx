import CarbonLayout from "./carbon/carbon-layout";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return <CarbonLayout>{children}</CarbonLayout>;
}

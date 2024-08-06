"use client";

import CarbonLayout from "./carbon/carbon-layout";
import AuthWrapper from "../../components/Auth";

type LayoutProps = {
  children: React.ReactNode;
};

export default function DefaultLayout({ children }: LayoutProps) {
  return (
    <AuthWrapper>
      <CarbonLayout>{children}</CarbonLayout>
    </AuthWrapper>
  );
}

// function LayoutProvider({ children }: LayoutProps) {
//   const isMounted = useIsMounted();

//   if (!isMounted) {
//     return null;
//   }

//   return (

//   );
// }

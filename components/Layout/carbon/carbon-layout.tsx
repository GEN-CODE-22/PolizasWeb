import Header from "./carbon-header";
import { CarbonSidebar } from "./carbon-sidebar";

import React, { FC } from "react";

interface Props {
  children: React.ReactNode;
}
const CarbonLayout: FC<Props> = ({ children }) => {
  return (
    <main className="flex min-h-screen flex-grow">
      <CarbonSidebar className="fixed hidden flex-col justify-between  xl:block" />
      <div className="flex w-full flex-col xl:ms-[270px] xl:w-[calc(100%-270px)] 2xl:ms-72 2xl:w-[calc(100%-288px)]">
        <Header />
        <div className="flex flex-grow flex-col px-4 pb-6 pt-2 md:px-5 lg:px-6 lg:pb-8 3xl:px-8 3xl:pt-4 4xl:px-10 4xl:pb-9">
          {children}
        </div>
      </div>
    </main>
  );
};

export default CarbonLayout;

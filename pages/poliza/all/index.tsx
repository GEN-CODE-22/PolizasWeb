import { PolizasContent } from "@/components/content/polizas";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import PageHeader from "@/components/ui/page-header";
import React from "react";

const PolizasAll = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Polizas por día"} breadcrumb={[]} />
      <PolizasContent />
    </DefaultLayout>
  );
};

export default PolizasAll;

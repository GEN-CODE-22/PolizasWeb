import { PolizasContent } from "@/components/content/polizas";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import PageHeader from "@/components/ui/page-header";
import React from "react";

const ListPolizas = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Polizas Cobranza"} breadcrumb={[]} />
      <PolizasContent tipo={"L"} />
    </DefaultLayout>
  );
};

export default ListPolizas;

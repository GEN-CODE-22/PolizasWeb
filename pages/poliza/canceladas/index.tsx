import { PolizasContent } from "@/components/content/polizas";
import { FilterElement } from "@/components/content/polizas/FilterElement";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import PageHeader from "@/components/ui/page-header";
import React from "react";

const ListPolizas = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Polizas Facturas Canceladas"} breadcrumb={[]} />
      <PolizasContent tipo={"C"} />
    </DefaultLayout>
  );
};

export default ListPolizas;

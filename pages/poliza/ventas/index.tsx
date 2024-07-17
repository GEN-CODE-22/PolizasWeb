import { PolizasContent } from "@/components/content/polizas";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import PageHeader from "@/components/ui/page-header";
import React from "react";

const ListPolizas = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Polizas Ventas"} breadcrumb={[]} />
      <PolizasContent tipo={"V"} />
    </DefaultLayout>
  );
};

export default ListPolizas;

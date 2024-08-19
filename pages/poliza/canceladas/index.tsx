"use client";

import { PolizasContent } from "@/components/content/polizas";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import PageHeader from "@/components/ui/page-header";

const ListPolizas = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Polizas Facturas Canceladas"} breadcrumb={[]} />
      <PolizasContent tipo={"C"} />
    </DefaultLayout>
  );
};

export default ListPolizas;

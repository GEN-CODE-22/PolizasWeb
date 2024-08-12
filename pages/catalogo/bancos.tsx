"use client";

import DefaultLayout from "@/components/Layout/LayoutProvider";
import { CajaCuentasContent } from "@/components/content/catalogos/CajaCuentas/CajaCuentasContent";
import PageHeader from "@/components/ui/page-header";

const Bancos = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Catalogo Bancos"} breadcrumb={[]} />
      <CajaCuentasContent />
    </DefaultLayout>
  );
};

export default Bancos;

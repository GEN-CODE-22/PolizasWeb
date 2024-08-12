"use client";

import DefaultLayout from "@/components/Layout/LayoutProvider";
import { CuentasContableContent } from "@/components/content/catalogos/CuentasContable/CuentasContableContent";
import PageHeader from "@/components/ui/page-header";

const CuentasContable = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Catalogo Cuentas Contable"} breadcrumb={[]} />
      <CuentasContableContent />
    </DefaultLayout>
  );
};

export default CuentasContable;

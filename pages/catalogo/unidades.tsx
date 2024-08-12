"use client";

import DefaultLayout from "@/components/Layout/LayoutProvider";
import { UnidadesOperativaContent } from "@/components/content/catalogos/UnidadesOperativa/UnidadesOperativaContent";
import PageHeader from "@/components/ui/page-header";

const Unidades = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Catalogo Unidades Operativas"} breadcrumb={[]} />
      <UnidadesOperativaContent />
    </DefaultLayout>
  );
};

export default Unidades;

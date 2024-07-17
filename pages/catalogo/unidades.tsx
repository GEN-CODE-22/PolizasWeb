import DefaultLayout from "@/components/Layout/LayoutProvider";
import { UnidadesOperativaContent } from "@/components/content/catalogos/UnidadesOperativa/UnidadesOperativaContent";
import React from "react";

const Unidades = () => {
  return (
    <DefaultLayout>
      <UnidadesOperativaContent />
    </DefaultLayout>
  );
};

export default Unidades;

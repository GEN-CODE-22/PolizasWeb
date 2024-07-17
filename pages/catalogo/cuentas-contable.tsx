import DefaultLayout from "@/components/Layout/LayoutProvider";
import { CuentasContableContent } from "@/components/content/catalogos/CuentasContable/CuentasContableContent";

import React from "react";

const CuentasContable = () => {
  return (
    <DefaultLayout>
      <CuentasContableContent />
    </DefaultLayout>
  );
};

export default CuentasContable;

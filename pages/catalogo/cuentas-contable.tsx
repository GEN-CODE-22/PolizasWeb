import DefaultLayout from "@/components/Layout/LayoutProvider";
import { CuentasContableContent } from "@/components/content/catalogos/CuentasContable/CuentasContableContent";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";

import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const CuentasContable = () => {
  return (
    <DefaultLayout>
      <CuentasContableContent />
    </DefaultLayout>
  );
};

export default CuentasContable;

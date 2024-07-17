import DefaultLayout from "@/components/Layout/LayoutProvider";
import { CuentasContableContent } from "@/components/content/catalogos/CuentasContable/CuentasContableContent";
import PageHeader from "@/components/ui/page-header";
import { getServerSession } from "next-auth";

import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import { GetServerSideProps } from "next";

const CuentasContable = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Catalogo Cuentas Contable"} breadcrumb={[]} />
      <CuentasContableContent />
    </DefaultLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  res,
  query,
}) => {
  const session = await getServerSession(req, res, authOptions);

  const { p = "/auth/login" } = query;

  if (!session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default CuentasContable;

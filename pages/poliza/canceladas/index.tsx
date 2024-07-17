import { PolizasContent } from "@/components/content/polizas";
import { FilterElement } from "@/components/content/polizas/FilterElement";
import DefaultLayout from "@/components/Layout/LayoutProvider";
import PageHeader from "@/components/ui/page-header";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";

const ListPolizas = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Polizas Facturas Canceladas"} breadcrumb={[]} />
      <PolizasContent tipo={"C"} />
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

export default ListPolizas;

import DefaultLayout from "@/components/Layout/LayoutProvider";
import { CajaCuentasContent } from "@/components/content/catalogos/CajaCuentas/CajaCuentasContent";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";
import PageHeader from "@/components/ui/page-header";

const Bancos = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Catalogo Bancos"} breadcrumb={[]} />
      <CajaCuentasContent />
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

export default Bancos;

"use client";

import DefaultLayout from "@/components/Layout/LayoutProvider";
import { UnidadesOperativaContent } from "@/components/content/catalogos/UnidadesOperativa/UnidadesOperativaContent";
import PageHeader from "@/components/ui/page-header";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]";

const Unidades = () => {
  return (
    <DefaultLayout>
      <PageHeader title={"Catalogo Unidades Operativas"} breadcrumb={[]} />
      <UnidadesOperativaContent />
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

export default Unidades;
